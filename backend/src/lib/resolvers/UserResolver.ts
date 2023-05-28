import { EntityManager } from '@mikro-orm/core'
import { User } from 'src/types/entities/User'
import { Ctx, Query, Resolver } from 'type-graphql'
import { getInvitedUsersAction } from '../actions/UserActions'

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getInvitedUsers (
    @Ctx('em') em: EntityManager,
    @Ctx('user') user: User
  ): Promise<User[]> {
    return await getInvitedUsersAction(user, em)
  }
}
