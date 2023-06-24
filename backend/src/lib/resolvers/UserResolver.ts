import { EntityManager } from '@mikro-orm/core'
import { User } from 'src/types/entities/User'
import { Ctx, Query, Resolver } from 'type-graphql'

import { AuthCustomContext } from 'src/types/interfaces/CustomContext'
import { Invitation } from 'src/types/entities/Invitation'

import { getInvitedUsersAction, getPendingInvitationsAction } from '../actions/UserActions'

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
}
