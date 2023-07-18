import { IsInt, IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class GradeFieldsInput {
  @Field()
  key: string

  @Field()
  title: string

  @Field()
  @IsInt()
  min_val: number

  @Field()
  max_val: number
}

@InputType()
export class CourseProgramInput {
  @Field()
  slug: string

  @Field()
  @IsString()
  university: string

  @Field()
  department: string

  @Field()
  title: string

  @Field()
  description: string

  @Field()
  sitelink: string
}
