import { IsInt, IsUUID } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

ObjectType()
export class ReviewGrade {
  @Field()
  key: string

  @Field()
  @IsInt()
  grade: number
}

@InputType()
export class ReviewInput {
  @Field()
  @IsUUID()
  candidate: string

  @Field(() => [ReviewGrade])
  review: ReviewGrade[]
}
