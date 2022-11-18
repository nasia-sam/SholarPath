import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager } from '@mikro-orm/core'
import { Reference } from 'src/types/entities/Reference'
import { getReferenceByTokenAction, writeReferenceAction } from '../actions/ReferenceActions'
import { ReferenceInput } from 'src/types/classes/inputs/ReferenceInput'

@Resolver(() => Reference)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ReferenceResolver {
  @Query(() => Reference)
  async getReferenceByToken (
    @Ctx('em') em: EntityManager,
    @Arg('token') token: string
  ): Promise<Reference> {
    return await getReferenceByTokenAction(token, em)
  }

  @Mutation(() => Boolean)
  async writeReference (
    @Ctx('em') em: EntityManager,
    @Arg('data', () => ReferenceInput) data: ReferenceInput,
    @Arg('token') token: string
  ): Promise<boolean> {
    return await writeReferenceAction(token, data, em)
  }
}
