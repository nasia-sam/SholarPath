import { EntityManager } from '@mikro-orm/core'
import { CourseProgram } from 'src/types/entities/CourseProgram'

import { Roles, UserRole } from 'src/types/entities/Roles'
import { User } from 'src/types/entities/User'

export async function getRolesByUserAction (userId: string, em: EntityManager): Promise<Roles[]> {
  const userRoles = await em.find(Roles, { user: { id: userId } })

  return userRoles
}

export async function createRoleAction (id: string, courseId: string, em: EntityManager): Promise<Roles> {
  const user = await em.findOneOrFail(User, { id: id })
  const course = await em.findOneOrFail(CourseProgram, courseId)

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
