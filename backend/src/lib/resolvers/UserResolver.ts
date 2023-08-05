import { EntityManager } from '@mikro-orm/core'
import { User } from 'src/types/entities/User'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import { AuthCustomContext } from 'src/types/interfaces/CustomContext'
import { Invitation } from 'src/types/entities/Invitation'

import { getInvitedUsersAction, getPendingInvitationsAction, giveAdminRightsAction } from '../actions/UserActions'

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getInvitedUsers (
    @Ctx('em') em: EntityManager,
    @Ctx('ctx') ctx: AuthCustomContext
  ): Promise<User[]> {
    return await getInvitedUsersAction(ctx.user, em)
  }

  @Query(() => [Invitation])
  async getPendingInvitations (
    @Ctx('em') em: EntityManager,
    @Ctx('ctx') ctx: AuthCustomContext
  ): Promise<Invitation[]> {
    return await getPendingInvitationsAction(ctx.user.id, em)
  }

  @Mutation(() => Boolean)
  async giveAdminRights (
    @Ctx('em') em: EntityManager,
    @Arg('id') id: string
  ): Promise<boolean> {
    return await giveAdminRightsAction(id, em)
  }
}
