import { Field, ID, ObjectType, Root } from 'type-graphql'
import { Collection, Embedded, Entity, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core'
import { v4 } from 'uuid'

import { GraphQLJSONObject } from 'graphql-type-json'

import { CallForSubmissions } from './CallForSubmissions'
import { Roles, UserRole } from './Roles'
import { GradeFields } from '../classes/GradeFields'

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

  @Property({ columnType: 'text' })
  @Field()
  description: string

  @Property()
  @Field()
  open: boolean

  @Property()
  @Field()
  sitelink: string

  @Embedded(() => GradeFields, { array: true })
  @Field(() => [GraphQLJSONObject], { nullable: true })
  gradeFields: GradeFields[]

  @Field(() => [Roles])
  @OneToMany(() => Roles, role => role.course)
  roles = new Collection<Roles>(this)

  @Field(() => [CallForSubmissions])
  @OneToMany(() => CallForSubmissions, cfs => cfs.courseProgram)
  cfs = new Collection<CallForSubmissions>(this)

  @Field(() => String)
  admin (@Root() course: CourseProgram): string | undefined {
    const admin = course.roles.getItems().find(r => r.role === UserRole.admin)
    return admin?.user.id
  }
}
