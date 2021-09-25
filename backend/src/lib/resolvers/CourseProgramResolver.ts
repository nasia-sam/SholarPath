/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { EntityManager } from '@mikro-orm/core'

import { createCourseProgramAction, deleteCourseProgramAction, updateCourseProgramAction } from '../actions/CourseProgramActions'

import { CourseProgram } from 'src/types/entities/CourseProgram'
import { CourseProgramInput } from 'src/types/classes/CourseProgramInput'
// import { User } from 'src/types/entities/User'

@Resolver(() => CourseProgram)
export class CourseProgramResolver {
  @Query(() => [CourseProgram])
  async getAllCoursePrograms (
    @Ctx('em') em: EntityManager
  ): Promise<CourseProgram[]> {
    return await em.find(CourseProgram, {}, ['roles', 'roles.user'])
  }

  @Query(() => CourseProgram)
  async getCourcebySlug (
    @Ctx('em') em: EntityManager,
      @Arg('slug') slug: string
  ): Promise<CourseProgram> {
    return await em.findOneOrFail(CourseProgram, { slug: slug })
  }

  @Mutation(() => CourseProgram)
  async createCourseProgram (
    @Ctx('em') em: EntityManager,
      @Arg('data', () => CourseProgramInput) data: CourseProgramInput
  ): Promise<CourseProgram> {
    return await createCourseProgramAction(data, em)
  }

  @Mutation(() => CourseProgram)
  async updateCourseProgram (
    @Ctx('em') em: EntityManager,
      @Arg('id') id: string,
      @Arg('data', () => CourseProgramInput) data: CourseProgramInput
  ): Promise<CourseProgram> {
    return await updateCourseProgramAction(id, data, em)
  }

  @Mutation(() => Boolean)
  async deleteCourseProgram (
    @Ctx('em') em: EntityManager,
      @Arg('id') id: string
  ): Promise<boolean> {
    return await deleteCourseProgramAction(id, em)
  }
}