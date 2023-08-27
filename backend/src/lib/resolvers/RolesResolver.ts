import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { EntityManager } from '@mikro-orm/core'

import { Roles } from 'src/types/entities/Roles'
import { createRoleAction, deleteRoleAction } from '../actions/RolesActions'
import { AuthCustomContext } from 'src/types/interfaces/CustomContext'
import { isCreatedByAdmin } from '../tasks/AuthenticationGuards'

@Resolver(() => Roles)
export class RolesResolver {
  @Mutation(() => Roles)
  async createRole (
    @Ctx('em') em: EntityManager,
      @Ctx('ctx') ctx: AuthCustomContext,
      @Arg('userId') userId: string,
      @Arg('courseId') courseId: string
  ): Promise<Roles> {
    await isCreatedByAdmin(ctx.user, courseId, em)
    return await createRoleAction(userId, courseId, em)
  }

  @Mutation(() => String)
  async deleteRole (
    @Ctx('em') em: EntityManager,
      @Arg('id') id: string
  ): Promise<string> {
    return await deleteRoleAction(id, em)
  }
}
