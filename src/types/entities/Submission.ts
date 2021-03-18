import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'

import { Candidate } from './Candidate'

export enum State {
  submitted = 'submitted',
  reviewed = 'reviewed',
  accepted = 'accepted',
  declined = 'declined'
}

@Entity()
@ObjectType()
export class Submission {
  @PrimaryKey()
  @Field(() => ID)
  id: string = v4()

  @Property()
  @Field(() => State)
  state = State

  @Property()
  @Field()
  bachelor_relevance: number

  @Property()
  @Field()
  research_field_relevance: number

  @Property()
  @Field()
  grade_of_thesis: number

  @Property()
  @Field()
  existance_of_other_diplomas: boolean

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
}
