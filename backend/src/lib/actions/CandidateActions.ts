import { EntityManager } from '@mikro-orm/core'
import { UserInputError } from 'apollo-server-koa'

import { CallForSubmissions } from 'src/types/entities/CallForSubmissions'
import { Candidate } from 'src/types/entities/Candidate'
import { CandidateInput } from 'src/types/classes/inputs/CandidateInput'

import { CFS_State } from 'src/types/enums/CFSState'
import { FileType } from 'src/types/enums/FileType'

import { upploadFile } from 'src/lib/tasks/UploadFile'
import { ReviewInput } from 'src/types/classes/inputs/ReviewCandidate'
import { References } from 'src/types/classes/Referencies'
import { handleReferences } from '../tasks/HandleReferences'

// import { GradeFields } from 'src/types/classes/GradeFields'

// async function createUniqueToken (em: EntityManager): Promise<string> {
//   const token = nanoid()

//   const [_, count] = await em.findAndCount(Candidate, {
//     referencies: { token: token }
//   })

//   if (count > 0) return await createUniqueToken(em)
//   else return token
// }

export async function createCandidateAction (data: CandidateInput, em: EntityManager): Promise<Candidate> {
  const cfs = await em.findOneOrFail(CallForSubmissions, { id: data.cfs })

  if (cfs.state !== CFS_State.open) {
    throw new UserInputError('CFS NOT OPEN')
  }

  const candidate = em.create(Candidate, { ...data, attachedDocuments: [], referencies: undefined })
  await em.persistAndFlush(candidate)

  // handle referencies
  if (cfs.documents?.references) {
    if (!data.referenceInfo) {
      throw new UserInputError('MISSING_REFERENCE')
    }
    candidate.referencies = await handleReferences(data.referenceInfo, candidate.id, em)
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

export async function writeReferenceAction (token: string, em: EntityManager): Promise<boolean> {
  const candidate = await em.findOneOrFail(Candidate, {
    referencies: { token: token }
  })

  const reference = candidate.referencies?.filter(r => r.token === token)[0]
  if (!reference || !candidate.referencies) throw new UserInputError('NO_REFERENCE_FOUND')

  const now = new Date()
  if (now > reference.expiresAt) throw new UserInputError('REFERENCE_EXPIRED')

  const index = candidate.referencies.findIndex(ref => ref.token === reference.token)
  if (index === -1) throw new UserInputError('NO_REFERENCE_FOUND')

  if (candidate.referencies[index].submittedAt) throw new UserInputError('REFERENCE_ALREADY_SUBMITTED')

  candidate.referencies[index] = {
    ...candidate.referencies[index],
    letter: reference.letter,
    name: reference.name,
    title: reference.title,
    submittedAt: new Date()
  }

  await em.flush()
  return true
}

export async function deleteCandidateAction (id: string, em: EntityManager): Promise<boolean> {
  const candidate = await em.findOneOrFail(Candidate, id)

  await em.removeAndFlush(candidate)
  return true
}
