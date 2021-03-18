import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'

import { User } from './User'
import { CourseProgram } from './CourseProgram'

export enum UserRole {
  admin = 'admin',
  moderator = 'moderator',
  superAdmin = 'superAdmin'
}

@Entity()
@ObjectType()
export class Roles {
  @PrimaryKey()
  @Field(() => ID)
  id: string = v4()

  @Property()
  @Field()
  role: UserRole

  @ManyToOne(() => CourseProgram)
  @Field(() => CourseProgram)
  course: CourseProgram

  @ManyToOne(() => User)
  @Field(() => User)
  user: User
}
