import { Field, InputType } from 'type-graphql'

@InputType()
export class GradeFieldsInput {
  @Field()
  key: string

  @Field()
  title: string

  @Field()
  weigth: number

  @Field()
  min_val: number

  @Field()
  max_val: number
}

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
}
