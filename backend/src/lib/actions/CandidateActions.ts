import { EntityManager } from '@mikro-orm/core'
import { CandidateInput } from 'src/types/classes/CandidateInput'
import { Candidate } from 'src/types/entities/Candidate'

export async function createCandidateAction (data: CandidateInput, em: EntityManager): Promise<Candidate> {
  const candidate = em.create(Candidate, data)

  await em.persistAndFlush(candidate)
  return candidate
}

export async function deleteCandidateAction (id: string, em: EntityManager): Promise<boolean> {
  const candidate = await em.findOneOrFail(Candidate, id)

  await em.removeAndFlush(candidate)
  return true
}