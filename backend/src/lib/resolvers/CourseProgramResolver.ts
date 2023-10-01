import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { EntityManager } from '@mikro-orm/core'

import { createCourseProgramAction, deleteCourseProgramAction, getCourseByAdminAction, updateCourseProgramAction } from '../actions/CourseProgramActions'

import { CourseProgram } from 'src/types/entities/CourseProgram'
import { CallForSubmissions } from 'src/types/entities/CallForSubmissions'

import { CourseProgramInput, GradeFieldsInput } from 'src/types/classes/inputs/CourseProgramInput'
import { CFS_State } from 'src/types/enums/CFSState'

import { checkClosedCFS, checkOpenCFS } from '../tasks/CheckOpenCFS'
import { AuthCustomContext } from 'src/types/interfaces/CustomContext'
import { isAdmin, isCreatedByAdmin } from '../tasks/AuthenticationGuards'

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
    return await em.findOneOrFail(CourseProgram, { slug }, { populate: ['roles', 'roles.user', 'cfs', 'cfs.courseProgram'] })
  }

  @Query(() => [CourseProgram])
  async getCourseByAdmin (
    @Ctx('em') em: EntityManager,
      @Ctx('ctx') ctx: AuthCustomContext
  ): Promise<CourseProgram[]> {
    isAdmin(ctx.user)
    return await getCourseByAdminAction(ctx.user.id, em)
  }

  @Mutation(() => CourseProgram)
  async createCourseProgram (
    @Ctx('em') em: EntityManager,
      @Ctx('ctx') ctx: AuthCustomContext,
      @Arg('gradeFields', () => [GradeFieldsInput]) gradeFields: GradeFieldsInput[],
      @Arg('data') data: CourseProgramInput
  ): Promise<CourseProgram> {
    isAdmin(ctx.user)
    return await createCourseProgramAction(data, gradeFields, ctx.user, em)
  }

  @Mutation(() => CourseProgram)
  async updateCourseProgram (
    @Ctx('em') em: EntityManager,
      @Ctx('ctx') ctx: AuthCustomContext,
      @Arg('id') id: string,
      @Arg('data', () => CourseProgramInput) data: CourseProgramInput,
      @Arg('gradeFields', () => [GradeFieldsInput]) gradeFields: GradeFieldsInput[]
  ): Promise<CourseProgram> {
    await isCreatedByAdmin(ctx.user, id, em)
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
    const cfs = course.cfs.getItems().filter(c => ![CFS_State.closed, CFS_State.done].includes(c.state))
    return cfs[0]
  }
}
