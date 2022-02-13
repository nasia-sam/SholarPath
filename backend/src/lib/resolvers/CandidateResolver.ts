import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager } from '@mikro-orm/core'

import { Candidate } from 'src/types/entities/Candidate'
import { CandidateInput } from 'src/types/classes/CandidateInput'
import { createCandidateAction, deleteCandidateAction } from '../actions/CandidateActions'

@Resolver(() => Candidate)
export class CandidateResolver {
  @Query(() => [Candidate])
  async getCandidatesByCourseId (
    @Ctx('em') em: EntityManager,
      @Arg('id') id: string
  ): Promise<Candidate[]> {
    return await em.find(Candidate, { course_id: id })
  }

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
