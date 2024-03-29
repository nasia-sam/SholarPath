import { type EntityManager } from '@mikro-orm/core'
import { UserInputError, AuthenticationError } from 'apollo-server-errors'

import { type CourseProgramInput, type GradeFieldsInput } from 'src/types/classes/inputs/CourseProgramInput'
import { CourseProgram } from 'src/types/entities/CourseProgram'
import { Roles, UserRole } from 'src/types/entities/Roles'
import { type User } from 'src/types/entities/User'

async function validateSlugs (slug: string, em: EntityManager, id: string | null = null): Promise<boolean> {
  const double = await em.findOne(CourseProgram, { slug })

  if (double && double.slug === slug && id !== double.id) {
    return false
  }

  if (!slug.match(/^[a-z0-9_]+$/i)) {
    return false
  }

  return true
}

export async function getCourseByAdminAction (userId: string, em: EntityManager): Promise<CourseProgram[]> {
  const courses = await em.find(CourseProgram, {
    roles: {
      role: UserRole.admin,
      user: {
        id: userId
      }
    }
  })

  return courses
}

export async function createCourseProgramAction (
  data: CourseProgramInput,
  gradeFields: GradeFieldsInput[],
  user: User,
  em: EntityManager
): Promise<CourseProgram> {
  const validSlugFlag = await validateSlugs(data.slug, em)
  if (!validSlugFlag) {
    throw new UserInputError('INVALID_SLUG')
  }

  const course = em.create(CourseProgram, {
    slug: data.slug,
    university: data.university,
    department: data.department,
    title: data.title,
    description: data.description,
    sitelink: data.sitelink,
    open: false,
    gradeFields
  })
  em.persist(course)

  const role = em.create(Roles, {
    role: UserRole.admin,
    user: user.id,
    course
  })
  em.persist(role)

  await em.flush()
  return course
}

export async function updateCourseProgramAction (id: string, data: CourseProgramInput, gradeFields: GradeFieldsInput[], user: User, em: EntityManager): Promise<CourseProgram> {
  if (!user.is_admin) throw new AuthenticationError('NOT_ENOUGH_PERMISSIONS')

  const course = await em.findOneOrFail(CourseProgram, id, { populate: ['roles'] })

  const validSlugFlag = await validateSlugs(data.slug, em, id)
  if (!validSlugFlag) {
    throw new UserInputError('INVALID_SLUG')
  }

  course.slug = data.slug
  course.university = data.university
  course.title = data.title
  course.description = data.description
  course.department = data.department
  course.sitelink = data.sitelink
  if (!course.open) course.gradeFields = gradeFields

  await em.flush()
  return course
}

export async function deleteCourseProgramAction (id: string, em: EntityManager): Promise<boolean> {
  const course = await em.findOneOrFail(CourseProgram, id, { populate: ['roles'] })

  if (course.open) {
    throw new UserInputError('CANNOT_DELETE_OPEN_PROGRAMS')
  }

  await em.removeAndFlush(course)
  return true
}
