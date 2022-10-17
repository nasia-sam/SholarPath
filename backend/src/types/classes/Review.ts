import { Field, ObjectType } from 'type-graphql'

import { ReviewGrade } from './inputs/ReviewCandidate'

@ObjectType()
export class Review {
  @Field(() => [ReviewGrade])
  review: ReviewGrade[]

  @Field()
  total: number

  // todo status ?
}
