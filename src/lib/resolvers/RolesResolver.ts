import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager } from '@mikro-orm/core'

import { Roles } from 'src/types/entities/Roles'
import { createRoleAction, deleteRoleAction } from '../actions/RolesActions'

@Resolver()
export class RolesResolver {
  @Query()
  async ping (): Promise<string> {
    return 'pong'
  }

  @Mutation(() => Roles)
  async createRole (
    @Ctx('em') em: EntityManager,
      @Arg('email') email: string,
      @Arg('courseId') courseId: string
  ): Promise<Roles> {
    return await createRoleAction(email, courseId, em)
  }

  @Mutation(() => String)
  async deleteRole (
    @Ctx('em') em: EntityManager,
      @Arg('id') id: string
  ): Promise<string> {
    return await deleteRoleAction(id, em)
  }
}
