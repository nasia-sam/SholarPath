import { IsInt, IsUUID, Max, Min, IsOptional } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class GradeSubmissionInput {
  @Field()
  @IsUUID()
  candidate: string

  // {
  //   key: 'bachelor_relevance',
  //   title: 'Bachelor Relevance',
  //   weight: 0.3,
  //   min_val: 0,
  //   max: 5
  // }

  // candidate_id: 32,
  // review: {
  //   {
  //     key: bachelor_relevance
  //     grade: 4
  //   }
  // }

  @Field()
  @IsOptional()
  @Max(5)
  @Min(1)
  @IsInt()
  bachelor_relevance: number

  @Field()
  @IsOptional()
  @Max(5)
  @Min(1)
  @IsInt()
  research_field_relevance: number

  @Field()
  @IsOptional()
  @Max(10)
  @Min(0)
  @IsInt()
  bachelor_grade: number

  @Field()
  @IsOptional()
  @Max(5)
  @Min(0)
  @IsInt()
  thesis_grade: number

  @Field()
  @IsOptional()
  @Max(5)
  @Min(0)
  @IsInt()
  prerequisites_courses_grade: number

  @Field()
  @IsOptional()
  @Max(5)
  @Min(0)
  @IsInt()
  working_experience_relevance: number

  @Field()
  @IsOptional()
  @Max(20)
  @Min(0)
  interview: number
}
