import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { EntityManager } from '@mikro-orm/core'

import { Candidate } from 'src/types/entities/Candidate'
import { CandidateInput } from 'src/types/classes/CandidateInput'
import { createCandidateAction, deleteCandidateAction } from '../actions/CandidateActions'

@Resolver()
export class CandidateResolver {
  @Mutation(() => Candidate)
  async createCandidate (
    @Ctx('em') em: EntityManager,
      @Arg('data') data: CandidateInput
  ): Promise<Candidate> {
    return await createCandidateAction(data, em)
  }

  @Mutation(() => Boolean)
  async deleteCandidate (
    @Ctx('em') em: EntityManager,
      @Arg('id') id: string
  ): Promise<boolean> {
    return await deleteCandidateAction(id, em)
  }
}
