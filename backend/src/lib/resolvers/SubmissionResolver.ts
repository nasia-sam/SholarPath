import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import { EntityManager } from '@mikro-orm/core'

import { Submission } from 'src/types/entities/Submission'
import { GradeSubmissionInput } from 'src/types/classes/inputs/GadeSubmissionInput'
import { createSubmissionAction, gradeSubmissionAction } from '../actions/SubmissionActions'

@Resolver(() => Submission)
export class SubmissionResolver {
  @Mutation(() => String)
  async createSubmission (
    @Ctx('em') em: EntityManager,
    @Arg('data') data: GradeSubmissionInput
  ): Promise<string> {
    return await createSubmissionAction(data, em)
  }

  @Authorized()
  @Mutation(() => Submission)
  async gradeSubmission (
    @Ctx('em') em: EntityManager,
    @Ctx('ctx') ctx: AuthCustomContext,
    @Arg('data') data: GradeSubmissionInput,
    @Arg('id') id: string
  ): Promise<Submission> {
    return await gradeSubmissionAction(id, data, em)
  }
}
