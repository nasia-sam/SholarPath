import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager } from '@mikro-orm/core'

import { Candidate } from 'src/types/entities/Candidate'
import { AcceptCandidatesInput } from 'src/types/classes/inputs/AcceptCandidates'
import { CandidateInput } from 'src/types/classes/inputs/CandidateInput'
import { ReviewInput } from 'src/types/classes/inputs/ReviewCandidate'

import { createCandidateAction, gradeCandidateAction, deleteCandidateAction, getCandidatesByCfsAction, getCandidateByIdAction, acceptCandidatesAction } from '../actions/CandidateActions'

@Resolver(() => Candidate)
export class CandidateResolver {
  @Query(() => [Candidate])
  async getCandidatesByCfs (
    @Ctx('em') em: EntityManager,
      @Arg('id') id: string
  ): Promise<Candidate[]> {
    return await getCandidatesByCfsAction(id, em)
  }

  @Query(() => Candidate)
  async getCandidateById (
    @Ctx('em') em: EntityManager,
      @Arg('id') id: string
  ): Promise<Candidate> {
    return await getCandidateByIdAction(id, em)
  }

  @Mutation(() => Candidate)
  async createCandidate (
    @Ctx('em') em: EntityManager,
      @Arg('data') data: CandidateInput
  ): Promise<Candidate> {
    return await createCandidateAction(data, em)
  }

  @Mutation(() => Candidate)
  async gradeCandidate (
    @Ctx('em') em: EntityManager,
      @Arg('data') data: ReviewInput
  ): Promise<Candidate> {
    return await gradeCandidateAction(data, em)
  }

  @Mutation(() => Boolean)
  async acceptCandidates (
    @Ctx('em') em: EntityManager,
      @Arg('data') data: AcceptCandidatesInput
  ): Promise<boolean> {
    return await acceptCandidatesAction(data, em)
  }

  @Mutation(() => Boolean)
  async deleteCandidate (
    @Ctx('em') em: EntityManager,
      @Arg('id') id: string
  ): Promise<boolean> {
    return await deleteCandidateAction(id, em)
  }
}
