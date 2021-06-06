import { Field, ID, ObjectType } from 'type-graphql'
import { Collection, Entity, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core'
import { v4 } from 'uuid'

import { Roles } from './Roles'

@Entity()
@ObjectType()
export class User {
  @PrimaryKey()
  @Field(() => ID)
  id: string = v4()

  @Field()
  @Property()
  @Unique()
  email: string

  @Field()
  @Property()
  name: string

  @Field()
  @Property()
  confirm_email: boolean

  @Field()
  @Property()
  confirmed_by_admin: boolean

  @OneToMany(() => Roles, role => role.user)
  @Field(() => [Roles])
  roles = new Collection<Roles>(this)
}
