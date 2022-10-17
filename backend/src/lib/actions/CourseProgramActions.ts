import { EntityManager } from '@mikro-orm/core'
import { UserInputError } from 'apollo-server-errors'

import { CourseProgramInput } from 'src/types/classes/inputs/CourseProgramInput'
import { CourseProgram } from 'src/types/entities/CourseProgram'
import { Roles, UserRole } from 'src/types/entities/Roles'
import { User } from 'src/types/entities/User'

async function validateSlugs (slug: string, em: EntityManager, id: string | null = null): Promise<boolean> {
  const double = await em.findOne(CourseProgram, { slug: slug })

  if (double && double.slug === slug && id !== double.id) {
    return false
  }

  if (!slug.match(/^[a-z0-9_]+$/i)) {
    return false
  }

  return true
}

export async function createCourseProgramAction (data: CourseProgramInput, em: EntityManager): Promise<CourseProgram> {
  const admin = await em.findOneOrFail(User, data.adminId)

  if (!admin.confirmed_by_admin) {
    throw new UserInputError('NOT_ENOUGH_PERMISSIONS')
  }

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
    gradeFields: data.gradeFields
  })
  em.persist(course)

  const role = em.create(Roles, {
    role: UserRole.admin,
    user: admin,
    course: course
  })
  em.persist(role)

  await em.flush()
  return course
}

export async function updateCourseProgramAction (id: string, data: CourseProgramInput, em: EntityManager): Promise<CourseProgram> {
  const course = await em.findOneOrFail(CourseProgram, id, { populate: ['roles'] })

  // TODO logged user === admin

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
  course.gradeFields = data.gradeFields // todo check with open courses

  await em.flush()
  return course
}

export async function deleteCourseProgramAction (id: string, em: EntityManager): Promise<boolean> {
  const course = await em.findOneOrFail(CourseProgram, id, { populate: ['roles'] })

  // TODO logged user === admin

  if (course.open) {
    throw new UserInputError('CANNOT_DELETE_OPEN_PROGRAMS')
  }

  await em.removeAndFlush(course)
  return true
}
