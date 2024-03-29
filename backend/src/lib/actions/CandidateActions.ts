import { type EntityManager, QueryOrder } from '@mikro-orm/core'
import { UserInputError } from 'apollo-server-koa'

import { CallForSubmissions } from 'src/types/entities/CallForSubmissions'
import { Candidate } from 'src/types/entities/Candidate'
import { type CandidateInput } from 'src/types/classes/inputs/CandidateInput'
import { type ReviewInput } from 'src/types/classes/inputs/ReviewCandidate'

import { CFS_State } from 'src/types/enums/CFSState'
import { FileType } from 'src/types/enums/FileType'

import { upploadFile } from 'src/lib/tasks/UploadFile'
import { createReferenceAction } from 'src/lib/actions/ReferenceActions'
import { type AcceptCandidatesInput } from 'src/types/classes/inputs/AcceptCandidates'
import { acceptedEmailContent } from 'src/utils/emailContent/accepted'
import { declinedEmailContent } from 'src/utils/emailContent/declined'
import { CourseProgram } from 'src/types/entities/CourseProgram'
import { Candidate_State } from 'src/types/enums/CandidateState'
import { hasRole } from '../tasks/AuthenticationGuards'
import { type User } from 'src/types/entities/User'

export async function getCandidatesByCfsAction (cfsId: string, user: User, em: EntityManager): Promise<Candidate[]> {
  const course = await em.findOneOrFail(CourseProgram, { cfs: { id: cfsId } })

  await hasRole(user, course.id, em)
  return await em.find(Candidate, { cfs: { id: cfsId } }, { populate: ['cfs', 'references'] })
}

export async function getCandidateByIdAction (id: string, em: EntityManager): Promise<Candidate> {
  return await em.findOneOrFail(Candidate, { id }, { populate: ['references'] })
}

export async function createCandidateAction (data: CandidateInput, em: EntityManager): Promise<Candidate> {
  const cfs = await em.findOneOrFail(CallForSubmissions, { id: data.cfs })

  if (cfs.state !== CFS_State.open) {
    throw new UserInputError('CFS NOT OPEN')
  }

  const candidate = em.create(Candidate, {
    ...data,
    attachedDocuments: [],
    totalGrade: 0,
    state: Candidate_State.submitted
  })
  await em.persistAndFlush(candidate)

  // handle references
  if (cfs.documents?.references) {
    if (!data.referenceInfo) {
      throw new UserInputError('MISSING_REFERENCE')
    }
    await createReferenceAction(data.referenceInfo, candidate, em)
  }

  // handle documents
  if (data.proofDegree) await upploadFile(data.proofDegree, FileType.DEGREE, candidate.id, em)
  if (data.cv) await upploadFile(data.cv, FileType.CV, candidate.id, em)
  if (data.otherMasters) {
    for (let i = 0; i < data.otherMasters.length; i++) {
      await upploadFile(data.otherMasters[i], FileType.MASTER, candidate.id, em, i)
    }
  }

  return candidate
}

export async function gradeCandidateAction (data: ReviewInput, user: User, em: EntityManager): Promise<Candidate> {
  const candidate = await em.findOneOrFail(Candidate, { id: data.candidate }, { populate: ['cfs'] })

  if (!candidate) throw new UserInputError('INVALID_CANDIDATE')
  await hasRole(user, candidate.cfs.courseProgram.id, em)

  candidate.review = data.review
  candidate.totalGrade = data.review
    .reduce((acc, cur) => {
      acc += cur.grade
      return acc
    }, 0)

  console.log(candidate.totalGrade)

  await em.flush()

  return candidate
}

export async function acceptCandidatesAction (data: AcceptCandidatesInput, user: User, em: EntityManager): Promise<boolean> {
  const cfs = await em.findOneOrFail(CallForSubmissions, { id: data.cfsId }, { populate: ['courseProgram'] })
  if (cfs.state === CFS_State.done) throw new UserInputError('CFS_DONE')

  const [candidates, totalCount] = await em.findAndCount(Candidate, {
    cfs: { id: data.cfsId }
  }, {
    orderBy: { totalGrade: QueryOrder.DESC },
    populate: ['cfs']
  }
  )

  await hasRole(user, candidates[0].cfs.courseProgram.id, em)

  const accepted = candidates.slice(0, data.capacity)
  const declined = candidates.slice(data.capacity)

  const promises = []
  for (let i = 0; i < accepted.length; i++) {
    accepted[i].state = Candidate_State.approved
    promises.push(acceptedEmailContent(data, accepted[i], cfs, totalCount))
  }
  for (let i = 0; i < declined.length; i++) {
    declined[i].state = Candidate_State.waitList
    promises.push(declinedEmailContent(totalCount, data, declined[i], data.capacity + i + 1, cfs.courseProgram.title))
  }

  Promise.all(promises)
    .catch(err => { console.log(err) })

  cfs.state = CFS_State.done
  await em.flush()

  return true
}

export async function declineCandidateAction (data: AcceptCandidatesInput, course: CourseProgram, em: EntityManager): Promise<boolean> {
  const [declined, totalCount] = await em.findAndCount(Candidate, {
    cfs: { id: data.cfsId }
  }, {
    orderBy: { totalGrade: QueryOrder.DESC },
    offset: data.capacity
  })

  for (let i = 0; i < totalCount; i++) {
    await declinedEmailContent(totalCount, data, declined[i], data.capacity + i + 1, course.title)
  }
  return true
}

export async function deleteCandidateAction (id: string, em: EntityManager): Promise<boolean> {
  const candidate = await em.findOneOrFail(Candidate, id)

  await em.removeAndFlush(candidate)
  return true
}
