import { EntityManager } from '@mikro-orm/core'
import { nanoid } from 'nanoid'
import { addWeeks } from 'date-fns'

import { personalInfo } from 'src/types/classes/inputs/CandidateInput'
import { References } from 'src/types/classes/Referencies'
import { Candidate } from 'src/types/entities/Candidate'

async function createUniqueToken (em: EntityManager): Promise<string> {
  const token = nanoid()

  const [_, count] = await em.findAndCount(Candidate, {
    referencies: { token: token }
  })

  if (count > 0) return await createUniqueToken(em)
  else return token
}

export async function handleReferences (referenceInfo: personalInfo[], candidateId: string, em: EntityManager): Promise<References[]> {
  const references = []

  for await (const ref of referenceInfo) {
    const token = await createUniqueToken(em)
    references.push({
      token: token,
      email: ref.email,
      name: ref.name,
      candidateId: candidateId,
      title: '',
      letter: '',
      expiresAt: new Date(addWeeks(new Date(), 2))
    })

    // send emails
  }

  return references
}
