import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, ManyToOne, OneToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'

import { Candidate } from './Candidate'
import { CallForSubmissions } from './CallForSubmissions'

import { SubmissionState } from '../enums/SubmissionState'

@Entity()
@ObjectType()
export class Submission {
  @PrimaryKey()
  @Field(() => ID)
  id: string = v4()

  @Property()
  @Field(() => SubmissionState)
  state: SubmissionState

  @Property({ nullable: true })
  @Field()
  bachelor_relevance?: number

  @Property({ nullable: true })
  @Field()
  research_field_relevance?: number

  @Property({ nullable: true })
  @Field()
  bachelor_grade?: number

  @Property({ nullable: true })
  @Field()
  thesis_grade?: number

  @Property({ nullable: true })
  @Field()
  prerequisites_courses_grade?: number

  @Property({ nullable: true })
  @Field()
  existance_of_other_diplomas?: number

  @Property({ nullable: true })
  @Field()
  working_experience_relevance?: number

  @Property({ nullable: true })
  @Field()
  interview?: number

  @Property({ nullable: true })
  @Field()
  total_grade?: number

  // TODO DOCUMENTS

  @OneToOne(() => Candidate)
  candidate: Candidate

  @ManyToOne(() => CallForSubmissions)
  @Field(() => CallForSubmissions)
  cfs: CallForSubmissions // todo relationship with candidate
}
