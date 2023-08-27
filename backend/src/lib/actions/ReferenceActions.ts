import { type EntityManager } from '@mikro-orm/core'
import { UserInputError } from 'apollo-server-koa'
import { addWeeks } from 'date-fns'

import { Reference } from 'src/types/entities/Reference'
import { type Candidate } from 'src/types/entities/Candidate'

import { type ReferenceInput } from 'src/types/classes/inputs/ReferenceInput'
import { type personalInfo } from 'src/types/classes/inputs/CandidateInput'

export async function getReferenceByTokenAction (token: string, em: EntityManager): Promise<Reference> {
  const reference = await em.findOneOrFail(Reference, { token }, { populate: ['candidate'] })

  const now = new Date()
  if (now > reference.expiresAt) throw new UserInputError('REFERENCE_EXPIRED')

  if (reference.submittedAt) throw new UserInputError('REFERENCE_ALREADY_SUBMITTED')

  return reference
}

export async function createReferenceAction (referenceInfo: personalInfo[], candidate: Candidate, em: EntityManager): Promise<boolean> {
  const references = []

  for (const ref of referenceInfo) {
    const reference = new Reference()
    reference.email = ref.email
    reference.name = ref.name
    reference.title = ''
    reference.letter = ''
    reference.expiresAt = new Date(addWeeks(new Date(), 2))
    reference.submittedAt = undefined
    reference.candidate = candidate

    references.push(reference)
    // todo send emails
  }

  await em.persistAndFlush(references)

  return true
}

export async function writeReferenceAction (token: string, data: ReferenceInput, em: EntityManager): Promise<boolean> {
  const reference = await em.findOneOrFail(Reference, { token }, { populate: ['candidate'] })

  const now = new Date()
  if (now > reference.expiresAt) throw new UserInputError('REFERENCE_EXPIRED')

  if (reference.submittedAt) throw new UserInputError('REFERENCE_ALREADY_SUBMITTED')

  reference.letter = data.letter
  reference.name = data.name
  reference.title = data.title
  reference.submittedAt = new Date()

  await em.flush()

  return true
}
