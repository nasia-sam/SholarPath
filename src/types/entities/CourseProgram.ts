import { Field, ID, ObjectType } from 'type-graphql'
import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'

import { CallForSubmissions } from 'src/types/entities/CallForSubmissions'

@Entity()
@ObjectType()
export class CourseProgram {
  @PrimaryKey()
  @Field(() => ID)
  id: string = v4()

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

  @Field(() => [CallForSubmissions])
  @OneToMany(() => CallForSubmissions, cfs => cfs.CourseProgram)
  cfs = new Collection<CallForSubmissions>(this)
}
