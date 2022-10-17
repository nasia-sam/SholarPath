import { Field } from 'type-graphql'
import { Embeddable, Property } from '@mikro-orm/core'

import { ReviewGrade } from './inputs/ReviewCandidate'

@Embeddable()
export class Review {
  @Field(() => [ReviewGrade])
  @Property()
  review: ReviewGrade[]

  @Field()
  @Property()
  total: number

  // todo status ?
}
