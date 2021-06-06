import { EntityManager } from '@mikro-orm/core'
import { UserInputError } from 'apollo-server-errors'

import { CallForSubmissionsInput } from 'src/types/classes/CallForSubmissionsInput'
import { CallForSubmissions, CFS_State } from 'src/types/entities/CallForSubmissions'
import { CourseProgram } from 'src/types/entities/CourseProgram'

export async function createCFSAction (data: CallForSubmissionsInput, em: EntityManager): Promise<CallForSubmissions> {
  await em.findOneOrFail(CourseProgram, data.courseProgram)

  const cfs = em.create(CallForSubmissions, {
    openFrom: data.openFrom,
    closeAt: data.closeAt,
    state: CFS_State.published,
    documents: data.documents,
    year: data.year,
    courseProgram: data.courseProgram
  })

  await em.persistAndFlush(cfs)
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
  return cfs
}

export async function openCFSAction (id: string, openFrom: Date, closeAt: Date, em: EntityManager): Promise<CallForSubmissions> {
  const cfs = await em.findOneOrFail(CallForSubmissions, id, ['courseProgram'])

  if (cfs.state === CFS_State.closed) {
    throw new UserInputError('CANNOT_PUBLISH_CLOSED_CFS')
  }

  if (cfs.state === CFS_State.open) {
    throw new UserInputError('CFS_ALREADY_OPEN')
  }

  if (openFrom < new Date()) {
    throw new UserInputError('CANNOT_OPEN_CFS_TO_PAST')
  }

  cfs.openFrom = openFrom
  cfs.closeAt = closeAt
  cfs.courseProgram.open = true

  await em.flush()
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

export async function cloneCFSAction (oldId: string, openFrom: Date, closeAt: Date, year: Date, em: EntityManager): Promise<CallForSubmissions> {
  const oldCfs = await em.findOneOrFail(CallForSubmissions, oldId)
  const course = await em.findOneOrFail(CourseProgram, oldCfs.courseProgram)

  const clone = em.create(CallForSubmissions, {
    openFrom: openFrom,
    closeAt: closeAt,
    year: year,
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
