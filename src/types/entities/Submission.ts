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
  state = SubmissionState

  @Property()
  @Field()
  bachelor_relevance: number

  @Property()
  @Field()
  research_field_relevance: number

  @Property()
  @Field()
  bachelor_grade: number

  @Property()
  @Field()
  thesis_grade: number

  @Property()
  @Field()
  prerequisites_courses_grade: number

  @Property()
  @Field()
  existance_of_other_diplomas: number

  @Property()
  @Field()
  working_experience_relevance: number

  @Property()
  @Field()
  interview: number

  @Property()
  @Field()
  total_grade: number

  // TODO DOCUMENTS

  @OneToOne(() => Candidate, candidate => candidate.submission)
  candidate: Candidate

  @ManyToOne(() => CallForSubmissions)
  @Field(() => CallForSubmissions)
  cfs: CallForSubmissions
}
