import { Field, ID, ObjectType } from 'type-graphql'
import { Cascade, Collection, Entity, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core'
import { v4 } from 'uuid'

import { Roles } from './Roles'
import { Invitation } from './Invitation'

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

  @Property({ hidden: true })
  @Field()
    password: string

  @Field()
  @Property()
    name: string

  @Field()
  @Property()
    is_admin: boolean

  @OneToMany(() => Roles, role => role.user, { cascade: [Cascade.REMOVE] })
  @Field(() => [Roles])
    roles = new Collection<Roles>(this)

  @OneToMany(() => Invitation, invitation => invitation.invited_by)
  @Field(() => [Invitation])
    invitations = new Collection<Invitation>(this)
}
