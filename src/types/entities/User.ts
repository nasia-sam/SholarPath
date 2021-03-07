import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'

@Entity()
@ObjectType()
export class User {
  @PrimaryKey()
  @Field(() => ID)
  id: string = v4()

  @Field()
  @Property({ unique: true })
  email: string

  @Field()
  @Property()
  name: string

  @Field()
  @Property()
  confirmed: boolean
}
