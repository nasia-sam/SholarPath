import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'

import { User } from 'src/types/entities/User'
import { CallForSubmissions } from 'src/types/entities/CallForSubmissions'

export enum UserRole {
  admin = 'admin',
  moderator = 'moderator',
  superAdmin = 'superAdmin'
}

@Entity()
@ObjectType()
export class Role {
  @PrimaryKey()
  @Field(() => ID)
  id: string = v4()

  @Field()
  @Property()
  role: UserRole

  @ManyToOne(() => CallForSubmissions)
  @Field(() => CallForSubmissions)
  cfs: CallForSubmissions

  @ManyToOne(() => User)
  @Field(() => User)
  user: User
}
