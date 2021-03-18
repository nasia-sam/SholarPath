import { Field, ID, ObjectType } from 'type-graphql'
import { Collection, Entity, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core'
import { v4 } from 'uuid'

import { CallForSubmissions } from './CallForSubmissions'
import { Roles } from './Roles'

@Entity()
@ObjectType()
export class CourseProgram {
  @PrimaryKey()
  @Field(() => ID)
  id: string = v4()

  @Property()
  @Field()
  @Unique()
  slug: string

  @Property()
  @Field()
  university: string

  @Property()
  @Field()
  department: string

  @Property()
  @Field()
  title: string

  @Property()
  @Field()
  description: string

  @Property()
  @Field()
  open: boolean

  @Property()
  @Field()
  sitelink: string

  @Field(() => [Roles])
  @OneToMany(() => Roles, role => role.course)
  roles = new Collection<Roles>(this)

  @Field(() => [CallForSubmissions])
  @OneToMany(() => CallForSubmissions, cfs => cfs.CourseProgram)
  cfs = new Collection<CallForSubmissions>(this)
}
