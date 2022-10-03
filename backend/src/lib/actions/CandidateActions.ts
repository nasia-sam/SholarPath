import { EntityManager } from '@mikro-orm/core'
import { UserInputError } from 'apollo-server-koa'

import { CallForSubmissions } from 'src/types/entities/CallForSubmissions'
import { Candidate } from 'src/types/entities/Candidate'
import { CandidateInput } from 'src/types/classes/inputs/CandidateInput'

import { CFS_State } from 'src/types/enums/CFSState'
import { FileType } from 'src/types/enums/FileType'

import { upploadFile } from 'src/lib/tasks/UploadFile'

export async function createCandidateAction (data: CandidateInput, em: EntityManager): Promise<Candidate> {
  const cfs = await em.findOneOrFail(CallForSubmissions, { id: data.cfs })

  if (cfs.state !== CFS_State.open) {
    throw new UserInputError('CFS NOT OPEN')
  }

  const candidate = em.create(Candidate, { ...data, attachedDocuments: [], referencies: undefined })
  await em.persistAndFlush(candidate)

  if (data.proofDegree) await upploadFile(data.proofDegree, FileType.DEGREE, candidate.id, em)
  if (data.cv) await upploadFile(data.cv, FileType.CV, candidate.id, em)
  if (data.otherMasters) {
    for (let i = 0; i < data.otherMasters.length; i++) {
      await upploadFile(data.otherMasters[i], FileType.MASTER, candidate.id, em, i)
    }
  }

  return candidate
}

export async function deleteCandidateAction (id: string, em: EntityManager): Promise<boolean> {
  const candidate = await em.findOneOrFail(Candidate, id)

  await em.removeAndFlush(candidate)
  return true
}
