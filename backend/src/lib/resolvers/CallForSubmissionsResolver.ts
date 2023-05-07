import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager } from '@mikro-orm/core'

import { CallForSubmissions } from 'src/types/entities/CallForSubmissions'
import { CallForSubmissionsInput } from 'src/types/classes/inputs/CallForSubmissionsInput'
import { CFS_State } from 'src/types/enums/CFSState'
import { createCFSAction, deleteCFSAction, extendCFSAction, getCFSByCourseAction, openCFSAction, updateCFSAction } from '../actions/CallForSubmissionsActions'

@Resolver(() => CallForSubmissions)
export class CallForSubmissionsResolver {
  @Query(() => CallForSubmissions)
  async getPublishedCFSbyCourse (
    @Ctx('em') em: EntityManager,
    @Arg('courseId') courseId: string
  ): Promise<CallForSubmissions> {
    return await em.findOneOrFail(CallForSubmissions, { $and: [{ courseProgram: courseId }, { state: { $in: [CFS_State.published, CFS_State.open] } }] })
  }

  @Query(() => [CallForSubmissions])
  async getCFSByCourse (
    @Ctx('em') em: EntityManager,
    @Arg('slug') slug: string
  ): Promise<CallForSubmissions[]> {
    return await getCFSByCourseAction(slug, em)
  }

  @Mutation(() => CallForSubmissions)
  async createCFS (
    @Ctx('em') em: EntityManager,
    @Arg('data', () => CallForSubmissionsInput) data: CallForSubmissionsInput
  ): Promise<CallForSubmissions> {
    return await createCFSAction(data, em)
  }

  @Mutation(() => CallForSubmissions)
  async updateCFS (
    @Ctx('em') em: EntityManager,
    @Arg('id') id: string,
    @Arg('data', () => CallForSubmissionsInput) data: CallForSubmissionsInput
  ): Promise<CallForSubmissions> {
    return await updateCFSAction(id, data, em)
  }

  @Mutation(() => CallForSubmissions)
  async extendCFS (
    @Ctx('em') em: EntityManager,
    @Arg('id') id: string,
    @Arg('closeAt') closeAt: Date
  ): Promise<CallForSubmissions> {
    return await extendCFSAction(id, closeAt, em)
  }

  @Mutation(() => Boolean)
  async deleteCFS (
    @Ctx('em') em: EntityManager,
    @Arg('id') id: string
  ): Promise<boolean> {
    return await deleteCFSAction(id, em)
  }
}
