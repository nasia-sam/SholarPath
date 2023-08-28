import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './User'
import { InvitationState } from '../enums/InvitationState'

@Entity()
@ObjectType()
export class Invitation {
  @PrimaryKey()
  @Field(() => ID)
    id: string

  @Property()
  @Field()
    email: string

  @ManyToOne(() => User)
  @Field(() => User)
    invited_by: User

  @Enum(() => InvitationState)
  @Field(() => InvitationState)
    state: InvitationState
}
