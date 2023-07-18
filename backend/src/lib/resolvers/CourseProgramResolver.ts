/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { EntityManager } from '@mikro-orm/core'

import { createCourseProgramAction, deleteCourseProgramAction, updateCourseProgramAction } from '../actions/CourseProgramActions'

import { CourseProgram } from 'src/types/entities/CourseProgram'
import { CallForSubmissions } from 'src/types/entities/CallForSubmissions'

import { CourseProgramInput, GradeFieldsInput } from 'src/types/classes/inputs/CourseProgramInput'
import { CFS_State } from 'src/types/enums/CFSState'

import { checkClosedCFS, checkOpenCFS } from '../tasks/CheckOpenCFS'
import { AuthCustomContext } from 'src/types/interfaces/CustomContext'
import { isCreatedByAdmin } from '../tasks/AuthenticationGuards'
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
    // @Ctx('ctx') ctx: AuthCustomContext,
    @Arg('gradeFields', () => [GradeFieldsInput]) gradeFields: GradeFieldsInput[],
    @Arg('data') data: CourseProgramInput
  ): Promise<CourseProgram> {
    console.log('in here!!!!  data:', data, '//', gradeFields)
    return await createCourseProgramAction(data, gradeFields, 'b4f0c92d-9715-40df-8f11-de34fc44b00d', em)
  }

  @Mutation(() => CourseProgram)
  async updateCourseProgram (
    @Ctx('em') em: EntityManager,
    @Ctx('ctx') ctx: AuthCustomContext,
    @Arg('id') id: string,
    @Arg('data', () => CourseProgramInput) data: CourseProgramInput,
    @Arg('gradeFields', () => [GradeFieldsInput]) gradeFields: GradeFieldsInput[]
  ): Promise<CourseProgram> {
    // await isCreatedByAdmin(ctx.user, id, em)
    console.log('===== UPDATE COURSE RESOLVER =======')
    return await updateCourseProgramAction(id, data, gradeFields, ctx.user, em)
  }

  @Mutation(() => Boolean)
  async deleteCourseProgram (
    @Ctx('em') em: EntityManager,
    @Ctx('ctx') ctx: AuthCustomContext,
    @Arg('id') id: string
  ): Promise<boolean> {
    await isCreatedByAdmin(ctx.user, id, em)
    return await deleteCourseProgramAction(id, em)
  }

  @FieldResolver(() => CallForSubmissions, { nullable: true })
  currentCFS (@Root() course: CourseProgram): CallForSubmissions | undefined {
    const cfs = course.cfs.getItems().filter(c => c.state !== CFS_State.closed)
    return cfs[0]
  }
}
