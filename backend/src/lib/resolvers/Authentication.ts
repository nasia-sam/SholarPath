import { EntityManager } from '@mikro-orm/core'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

@Resolver()
export class AuhenticationResolver {
  @Mutation(() => String)
  async loginUser (
    @Ctx('em') em: EntityManager
  ): Promise<string> {
    return 'hi'
  }
}
