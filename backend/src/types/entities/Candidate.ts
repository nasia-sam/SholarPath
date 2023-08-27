import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, Enum, ManyToOne, PrimaryKey, Property, Embedded, OneToMany, Collection } from '@mikro-orm/core'
import { GraphQLJSONObject } from 'graphql-type-json'

import { v4 } from 'uuid'

import { PdfFile } from '../classes/PdfFile'
import { Gender } from '../enums/Gender'

import { CallForSubmissions } from './CallForSubmissions'
import { Reference } from './Reference'
import { ReviewGrade } from '../classes/inputs/ReviewCandidate'
import { Candidate_State } from '../enums/CandidateState'

@Entity()
@ObjectType()
export class Candidate {
  @PrimaryKey()
  @Field(() => ID)
    id: string = v4()

  @Property()
  @Field()
    name: string

  @Property()
  @Field()
    surname: string

  @Property()
  @Field()
    father_name: string

  @Property()
  @Field()
    age: number

  @Property()
  @Field()
    address: string

  @Property()
  @Field()
    zip_code: string

  @Property()
  @Field()
    phone_number: string

  @Property()
  @Field()
    email: string

  @Property()
  @Field()
    bachelor_degree: string

  @Property()
  @Field()
    part_time: boolean

  @Enum(() => Gender)
  @Field(() => Gender)
    gender: Gender

  @Embedded(() => PdfFile, { array: true })
  @Field(() => [GraphQLJSONObject], { nullable: true })
    attachedDocuments: PdfFile[]

  @Property()
  @Field()
    course_id: string // todo ayto mporei na fygei

  @Embedded(() => ReviewGrade, { array: true, nullable: true })
  @Field(() => [GraphQLJSONObject], { nullable: true })
    review?: ReviewGrade[]

  @Field({ nullable: true })
  @Property()
    totalGrade: number

  @ManyToOne(() => CallForSubmissions)
  @Field(() => CallForSubmissions)
    cfs: CallForSubmissions

  @Field(() => [Reference])
  @OneToMany(() => Reference, references => references.candidate)
    references = new Collection<Reference>(this)

  @Enum(() => Candidate_State)
  @Field(() => Candidate_State, { nullable: true })
    state: Candidate_State = Candidate_State.submitted

  // @Field(() => Float, { nullable: true })
  // totalGrade (): number | null {
  //   const total = this.review
  //     ? this.review.reduce((acc, cur) => {
  //       acc += cur.grade
  //       return acc
  //     }, 0)
  //     : null

  //   return total
  // }
}
