import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager } from '@mikro-orm/core'

import { Candidate } from 'src/types/entities/Candidate'
import { CandidateInput } from 'src/types/classes/inputs/CandidateInput'
import { ReviewInput } from 'src/types/classes/inputs/ReviewCandidate'

import { createCandidateAction, gradeCandidateAction, deleteCandidateAction, writeReferenceAction, getCandidateReferenceByTokenAction } from '../actions/CandidateActions'
import { ReferenceInput } from 'src/types/classes/inputs/ReferenceInput'

@Resolver(() => Candidate)
export class CandidateResolver {
  @Query(() => [Candidate])
  async getCandidatesByCourseId (
    @Ctx('em') em: EntityManager,
    @Arg('id') id: string
  ): Promise<Candidate[]> {
    return await em.find(Candidate, { cfs: { id: id } })
  }

  @Query(() => Candidate)
  async getCandidateReferenceByToken (
    @Ctx('em') em: EntityManager,
    @Arg('token') token: string
  ): Promise<Candidate> {
    return await getCandidateReferenceByTokenAction(token, em)
  }

  @Mutation(() => Candidate)
  async createCandidate (
    @Ctx('em') em: EntityManager,
    @Arg('data') data: CandidateInput
  ): Promise<Candidate> {
    return await createCandidateAction(data, em)
  }

  @Mutation(() => Boolean)
  async gradeCandidate (
    @Ctx('em') em: EntityManager,
    @Arg('data') data: ReviewInput
  ): Promise<boolean> {
    return await gradeCandidateAction(data, em)
  }

  @Mutation(() => Boolean)
  async writeReference (
    @Ctx('em') em: EntityManager,
    @Arg('token') token: string,
    @Arg('data', () => ReferenceInput) data: ReferenceInput
  ): Promise<boolean> {
    return await writeReferenceAction(token, data, em)
  }

  @Mutation(() => Boolean)
  async deleteCandidate (
    @Ctx('em') em: EntityManager,
    @Arg('id') id: string
  ): Promise<boolean> {
    return await deleteCandidateAction(id, em)
  }
}
