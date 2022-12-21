/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { EntityManager } from '@mikro-orm/core'

import { createCourseProgramAction, deleteCourseProgramAction, updateCourseProgramAction } from '../actions/CourseProgramActions'

import { CourseProgram } from 'src/types/entities/CourseProgram'
import { CallForSubmissions } from 'src/types/entities/CallForSubmissions'

import { CourseProgramInput, GradeFieldsInput } from 'src/types/classes/inputs/CourseProgramInput'
import { CFS_State } from 'src/types/enums/CFSState'

import { checkClosedCFS, checkOpenCFS } from '../tasks/CheckOpenCFS'
// import { User } from 'src/types/entities/User'

@Resolver(() => CourseProgram)
export class CourseProgramResolver {
  @Query(() => [CourseProgram])
  async getAllCoursePrograms (
    @Ctx('em') em: EntityManager
  ): Promise<CourseProgram[]> {
    await checkOpenCFS(em)
    await checkClosedCFS(em)
    return await em.find(CourseProgram, {}, { populate: ['roles', 'roles.user', 'cfs'] })
  }

  @Query(() => CourseProgram)
  async getCourcebySlug (
    @Ctx('em') em: EntityManager,
    @Arg('slug') slug: string
  ): Promise<CourseProgram> {
    return await em.findOneOrFail(CourseProgram, { slug: slug }, { populate: ['roles', 'roles.user', 'cfs', 'cfs.courseProgram'] })
  }

  @Mutation(() => CourseProgram)
  async createCourseProgram (
    @Ctx('em') em: EntityManager,
    @Arg('data', () => CourseProgramInput) data: CourseProgramInput,
    @Arg('gradeFields', () => [GradeFieldsInput]) gradeFields: GradeFieldsInput[]
  ): Promise<CourseProgram> {
    return await createCourseProgramAction(data, gradeFields, em)
  }

  @Mutation(() => CourseProgram)
  async updateCourseProgram (
    @Ctx('em') em: EntityManager,
    @Arg('id') id: string,
    @Arg('data', () => CourseProgramInput) data: CourseProgramInput,
    @Arg('gradeFields', () => [GradeFieldsInput]) gradeFields: GradeFieldsInput[]
  ): Promise<CourseProgram> {
    return await updateCourseProgramAction(id, data, gradeFields, em)
  }

  @Mutation(() => Boolean)
  async deleteCourseProgram (
    @Ctx('em') em: EntityManager,
    @Arg('id') id: string
  ): Promise<boolean> {
    return await deleteCourseProgramAction(id, em)
  }

  @FieldResolver(() => CallForSubmissions, { nullable: true })
  currentCFS (@Root() course: CourseProgram): CallForSubmissions | undefined {
    const cfs = course.cfs.getItems().filter(c => c.state !== CFS_State.closed)
    return cfs[0]
  }
}
