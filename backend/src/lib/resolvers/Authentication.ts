import { EntityManager } from '@mikro-orm/core'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { loginAction, registerUserAction } from '../actions/AuthenticationActions'
import { LoginInput, UserInput } from 'src/types/classes/inputs/UserInput'

@Resolver()
export class AuhenticationResolver {
  @Mutation(() => String)
  async loginUser (
    @Ctx('em') em: EntityManager,
    @Arg('data', () => LoginInput) data: LoginInput
  ): Promise<string> {
    return await loginAction(data, em)
  }

  @Mutation(() => Boolean)
  async registerUser (
    @Ctx('em') em: EntityManager,
    @Arg('data', () => UserInput) data: UserInput
  ): Promise<boolean> {
    return await registerUserAction(data, em)
  }
}
