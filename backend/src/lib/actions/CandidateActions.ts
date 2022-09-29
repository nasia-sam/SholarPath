import { EntityManager } from '@mikro-orm/core'
import { UserInputError } from 'apollo-server-koa'
import { CandidateInput } from 'src/types/classes/inputs/CandidateInput'
import { CallForSubmissions } from 'src/types/entities/CallForSubmissions'
import { Candidate } from 'src/types/entities/Candidate'
import { CFS_State } from 'src/types/enums/CFSState'
import { upploadFile } from '../tasks/UploadFile'

export async function createCandidateAction (data: CandidateInput, em: EntityManager): Promise<Candidate> {
  const cfs = await em.findOneOrFail(CallForSubmissions, { id: data.cfs })

  if (cfs.state !== CFS_State.open) {
    throw new UserInputError('CFS NOT OPEN')
  }

  const candidate = em.create(Candidate, { ...data, cv: undefined })
  await em.persistAndFlush(candidate)

  if (data.cv) {
    await upploadFile(data.cv, candidate.id, em)
  }

  return candidate
}

export async function deleteCandidateAction (id: string, em: EntityManager): Promise<boolean> {
  const candidate = await em.findOneOrFail(Candidate, id)

  await em.removeAndFlush(candidate)
  return true
}
