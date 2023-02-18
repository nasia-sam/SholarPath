import { Field, ObjectType } from 'type-graphql'
import { Embeddable, Embedded, Property } from '@mikro-orm/core'

import { ReviewGrade } from './inputs/ReviewCandidate'

@Embeddable()
export class Review {
  @Embedded(() => [ReviewGrade], { object: true, nullable: true })
  @Property()
  review: ReviewGrade[]

  @Field()
  @Property()
  total: number

  // todo status ?
}
