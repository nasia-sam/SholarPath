import { EntityManager } from '@mikro-orm/core'
import { CourseProgram } from 'src/types/entities/CourseProgram'

import { Roles, UserRole } from 'src/types/entities/Roles'
import { User } from 'src/types/entities/User'

export async function createRoleAction (email: string, courseId: string, em: EntityManager): Promise<Roles> {
  const user = em.findOneOrFail(User, { email: email })
  const course = em.findOneOrFail(CourseProgram, courseId)

  // TODO check logged user is admin

  const role = em.create(Roles, {
    role: UserRole.moderator,
    course: course,
    user: user
  })

  await em.persistAndFlush(role)
  return role
}

export async function deleteRoleAction (id: string, em: EntityManager): Promise<string> {
  const role = await em.findOneOrFail(Roles, id)

  await em.removeAndFlush(role)
  return id
}
