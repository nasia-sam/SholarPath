import { Embeddable, Property } from '@mikro-orm/core'
import { Field } from 'type-graphql'

@Embeddable()
export class AdditionalFiles {
  @Field()
  @Property()
  proofDegree: boolean

  @Field()
  @Property()
  otherMasters: boolean

  @Field()
  @Property()
  references: boolean

  @Field()
  @Property()
  numberOfReferencies: number
}
