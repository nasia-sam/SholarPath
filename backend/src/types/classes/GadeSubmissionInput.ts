import { IsInt, IsUUID, Max, Min } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class GradeSubmissionInput {
  @Field()
  @IsUUID()
  id: string

  @Field()
  @Max(5)
  @Min(1)
  @IsInt()
  bachelor_relevance: number

  @Field()
  @Max(5)
  @Min(1)
  @IsInt()
  research_field_relevance: number

  @Field()
  @Max(10)
  @Min(0)
  @IsInt()
  bachelor_grade: number

  @Field()
  @Max(5)
  @Min(0)
  @IsInt()
  thesis_grade: number

  @Field()
  @Max(5)
  @Min(0)
  @IsInt()
  prerequisites_courses_grade: number

  @Field()
  @Max(5)
  @Min(0)
  @IsInt()
  working_experience_relevance: number

  @Field()
  @Max(20)
  @Min(0)
  interview: number
}
