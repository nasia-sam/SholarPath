import { EntityManager } from '@mikro-orm/core'
import { User } from 'src/types/entities/User'
import { Ctx, Query, Resolver } from 'type-graphql'
import { getInvitedUsersAction } from '../actions/UserActions'
import { AuthCustomContext } from 'src/types/interfaces/CustomContext'

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getInvitedUsers (
    @Ctx('em') em: EntityManager,
    @Ctx('ctx') ctx: AuthCustomContext
  ): Promise<User[]> {
    return await getInvitedUsersAction(ctx.user, em)
  }
}
