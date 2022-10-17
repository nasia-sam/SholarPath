import { Field, InputType } from 'type-graphql'
import { GradeFields } from '../GradeFields'

@InputType()
export class CourseProgramInput {
  @Field()
  slug: string

  @Field()
  university: string

  @Field()
  department: string

  @Field()
  title: string

  @Field()
  description: string

  @Field()
  sitelink: string

  @Field()
  adminId: string

  @Field(() => [GradeFields])
  gradeFields: GradeFields[]
}
