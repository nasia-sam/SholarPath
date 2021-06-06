import { Field, ID, ObjectType } from 'type-graphql'
import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'

import { CourseProgram } from './CourseProgram'
import { Submission } from './Submission'

export enum CFS_State {
  published = 'published',
  open = 'open',
  closed = 'closed'
}

@Entity()
@ObjectType()
export class CallForSubmissions {
  @PrimaryKey()
  @Field(() => ID)
  id: string = v4()

  @Property({ nullable: true })
  @Field(() => Date, { nullable: true })
  openFrom?: Date

  @Property({ nullable: true })
  @Field(() => Date, { nullable: true })
  closeAt?: Date

  @Property()
  @Field(() => [String])
  documents: string[]

  @Property()
  @Field()
  state: CFS_State

  @Property()
  @Field(() => Date)
  year: Date

  @ManyToOne(() => CourseProgram)
  @Field(() => CourseProgram)
  courseProgram: CourseProgram

  @Field(() => [Submission])
  @OneToMany(() => Submission, submissions => submissions.cfs)
  submissions = new Collection<Submission>(this)
}
