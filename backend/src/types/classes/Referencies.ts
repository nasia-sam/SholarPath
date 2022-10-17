import { Embeddable, Property } from '@mikro-orm/core'
import { Field } from 'type-graphql'

@Embeddable()
export class References {
  @Field()
  @Property()
  name: string

  @Field()
  @Property()
  email: string

  @Field()
  @Property()
  title: string // Dr Professor mr

  @Field()
  @Property({ columnType: 'text' })
  letter: string
}
