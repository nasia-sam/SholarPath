import { type EntityManager } from '@mikro-orm/core'
import { AuthenticationError } from 'apollo-server-koa'

import { CourseProgram } from 'src/types/entities/CourseProgram'
import { UserRole } from 'src/types/entities/Roles'
import { User } from 'src/types/entities/User'

export const isAuthenticated = (user: User | undefined): void => {
  if (!user) throw new AuthenticationError('UNAUTHORIZED')
}

export const isAdmin = (user: User | undefined): void => {
  if (!user || !user.is_admin) throw new AuthenticationError('UNAUTHORIZED')
}

export const isCreatedByAdmin = async (user: User | undefined, courseId: string, em: EntityManager): Promise<void> => {
  if (!user) throw new AuthenticationError('UNAUTHORIZED')

  const course = await em.findOneOrFail(CourseProgram, courseId, { populate: ['roles', 'roles.user'] })
  const courseAdmin = course.roles.getItems().find(r => r.role === UserRole.admin)?.user
  console.log(courseAdmin, user)
  if (!courseAdmin || courseAdmin?.id !== user.id) throw new AuthenticationError('INVALID_COURSE_ADMIN_PERMISSIONS')
}

export const hasRole = async (user: User | undefined, courseId: string, em: EntityManager): Promise<void> => {
  if (!user) throw new AuthenticationError('UNAUTHORIZED')

  const logged = await em.findOneOrFail(User,
    {
      id: user.id,
      roles: {
        course: { id: courseId }
      }
    },
    {
      populate: ['roles']
    })
  console.log('logged', logged)

  if (!logged) throw new AuthenticationError('UNAUTHORIZED')
}
