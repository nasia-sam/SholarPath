import { Field, ID, ObjectType } from 'type-graphql'
import { Collection, Embedded, Entity, Enum, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'

import { GraphQLJSONObject } from 'graphql-type-json'

import { CourseProgram } from './CourseProgram'
import { Candidate } from './Candidate'

import { CFS_State } from '../enums/CFSState'
import { AdditionalFiles } from '../classes/AdditionalFiles'

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

  @Embedded(() => AdditionalFiles, { object: true })
  @Field(() => GraphQLJSONObject, { nullable: true })
    documents?: AdditionalFiles

  @Enum(() => CFS_State)
  @Field(() => CFS_State)
    state: CFS_State

  @ManyToOne(() => CourseProgram)
  @Field(() => CourseProgram)
    courseProgram: CourseProgram

  @Field(() => [Candidate])
  @OneToMany(() => Candidate, candidates => candidates.cfs)
    candidates = new Collection<Candidate>(this)
}
