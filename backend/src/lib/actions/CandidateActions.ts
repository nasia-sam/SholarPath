import { EntityManager } from '@mikro-orm/core'
import { UserInputError } from 'apollo-server-koa'

import { CallForSubmissions } from 'src/types/entities/CallForSubmissions'
import { Candidate } from 'src/types/entities/Candidate'
import { CandidateInput } from 'src/types/classes/inputs/CandidateInput'
import { ReviewInput } from 'src/types/classes/inputs/ReviewCandidate'

import { CFS_State } from 'src/types/enums/CFSState'
import { FileType } from 'src/types/enums/FileType'

import { upploadFile } from 'src/lib/tasks/UploadFile'
import { createReferenceAction } from 'src/lib/actions/ReferenceActions'

export async function getCandidatesByCfsAction (cfsId: string, em: EntityManager): Promise<Candidate[]> {
  return await em.find(Candidate, { cfs: { id: cfsId } }, { populate: ['cfs'] })
}

export async function getCandidateByIdAction (id: string, em: EntityManager): Promise<Candidate> {
  return await em.findOneOrFail(Candidate, { id })
}

export async function createCandidateAction (data: CandidateInput, em: EntityManager): Promise<Candidate> {
  const cfs = await em.findOneOrFail(CallForSubmissions, { id: data.cfs })

  if (cfs.state !== CFS_State.open) {
    throw new UserInputError('CFS NOT OPEN')
  }

  const candidate = em.create(Candidate, { ...data, attachedDocuments: [] })
  await em.persistAndFlush(candidate)

  // handle referencies
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

export async function gradeCandidateAction (data: ReviewInput, em: EntityManager): Promise<boolean> {
  const candidate = await em.findOneOrFail(Candidate, { id: data.candidate }, { populate: ['cfs', 'cfs.courseProgram'] })

  if (!candidate) throw new UserInputError('INVALID_CANDIDATE')

  const gradeFields = candidate.cfs.courseProgram
    .gradeFields.reduce<{[key: string]: number}>((acc, cur) => {
    acc[cur.key] = cur.weigth
    return acc
  }, {})

  candidate.review = {
    review: data.review,
    total: data.review.reduce((acc, cur) => {
      acc += (cur.grade * gradeFields[cur.key])
      return acc
    }, 0)
  }

  await em.flush()
  return true
}

export async function deleteCandidateAction (id: string, em: EntityManager): Promise<boolean> {
  const candidate = await em.findOneOrFail(Candidate, id)

  await em.removeAndFlush(candidate)
  return true
}
