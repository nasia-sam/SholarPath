import { EntityManager } from '@mikro-orm/core'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { getInvitationByTokenAction, loginAction, registerUserAction } from '../actions/AuthenticationActions'
import { LoginInput, UserInput } from 'src/types/classes/inputs/UserInput'
import { Invitation } from 'src/types/entities/Invitation'

@Resolver()
export class AuhenticationResolver {
  @Query(() => Invitation)
  async getInvitationByToken (
    @Ctx('em') em: EntityManager,
    @Arg('token') token: string
  ): Promise<Invitation> {
    return await getInvitationByTokenAction(token, em)
  }

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
