import { type EntityManager } from '@mikro-orm/core'
import { UserInputError } from 'apollo-server-errors'

import { type CallForSubmissionsInput } from 'src/types/classes/inputs/CallForSubmissionsInput'
import { CFS_State } from 'src/types/enums/CFSState'

import { CallForSubmissions } from 'src/types/entities/CallForSubmissions'
import { CourseProgram } from 'src/types/entities/CourseProgram'

import { checkOpenCFS } from '../tasks/CheckOpenCFS'

export async function getCFSByCourseAction (slug: string, em: EntityManager): Promise<CallForSubmissions[]> {
  return await em.find(CallForSubmissions, {
    courseProgram: { slug }
  }, {
    orderBy: { openFrom: 'DESC' },
    populate: ['courseProgram']
  })
}

export async function createCFSAction (data: CallForSubmissionsInput, em: EntityManager): Promise<CallForSubmissions> {
  const course = await em.findOneOrFail(CourseProgram, data.courseProgram)

  const scheduled = await em.find(CallForSubmissions, {
    $and: [
      { courseProgram: course.id },
      { state: { $nin: [CFS_State.closed, CFS_State.done] } }
    ]
  })
  if (scheduled.length > 0) {
    throw new UserInputError('CFS_ALREADY_SCHEDULED')
  }

  const cfs = em.create(CallForSubmissions, {
    openFrom: data.openFrom,
    closeAt: data.closeAt,
    state: CFS_State.published,
    documents: data.documents,
    courseProgram: data.courseProgram
  })

  await em.persistAndFlush(cfs)

  await checkOpenCFS(em)
  return cfs
}

export async function updateCFSAction (id: string, data: CallForSubmissionsInput, em: EntityManager): Promise<CallForSubmissions> {
  const cfs = await em.findOneOrFail(CallForSubmissions, id)

  if (cfs.state === CFS_State.open || cfs.state === CFS_State.closed) {
    throw new UserInputError('CANNOT_EDIT_OPEN_OR_CLOSED_CFS')
  }

  if (data.openFrom < new Date()) {
    throw new UserInputError('CANNOT_EDIT_OPEN_FROM_TO_PAST')
  }

  cfs.closeAt = data.closeAt
  cfs.openFrom = data.openFrom
  cfs.documents = data.documents

  await em.flush()
  await checkOpenCFS(em)

  return cfs
}

export async function extendCFSAction (id: string, closeAt: Date, em: EntityManager): Promise<CallForSubmissions> {
  const cfs = await em.findOneOrFail(CallForSubmissions, id)

  if (cfs.state === CFS_State.closed) {
    throw new UserInputError('CANNOT_EXTEND_CLOSED_CFS')
  }

  cfs.closeAt = closeAt

  await em.flush()
  return cfs
}

export async function cloneCFSAction (oldId: string, openFrom: Date, closeAt: Date, em: EntityManager): Promise<CallForSubmissions> {
  const oldCfs = await em.findOneOrFail(CallForSubmissions, oldId)
  const course = await em.findOneOrFail(CourseProgram, oldCfs.courseProgram)

  const clone = em.create(CallForSubmissions, {
    openFrom,
    closeAt,
    documents: oldCfs.documents,
    courseProgram: course,
    state: CFS_State.published
  })

  await em.persistAndFlush(clone)
  return clone
}

export async function deleteCFSAction (id: string, em: EntityManager): Promise<boolean> {
  const cfs = await em.findOneOrFail(CallForSubmissions, id)

  if (cfs.state === CFS_State.open) {
    throw new UserInputError('CANNOT_DELETE_OPEN_CFS')
  }

  await em.removeAndFlush(cfs)
  return true
}
