import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, Enum, ManyToOne, PrimaryKey, Property, Embedded, OneToMany, Collection } from '@mikro-orm/core'
import { GraphQLJSONObject } from 'graphql-type-json'

import { v4 } from 'uuid'

import { PdfFile } from '../classes/PdfFile'
import { Gender } from '../enums/Gender'

import { CallForSubmissions } from './CallForSubmissions'
import { Reference } from './Reference'
import { ReviewGrade } from '../classes/inputs/ReviewCandidate'

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

  // @Embedded(() => References, { array: true, nullable: true })
  // @Field(() => [GraphQLJSONObject], { nullable: true })
  // referencies?: References[]

  @Embedded(() => ReviewGrade, { array: true, nullable: true })
  @Field(() => [GraphQLJSONObject], { nullable: true })
  review?: ReviewGrade[]

  @ManyToOne(() => CallForSubmissions)
  @Field(() => CallForSubmissions)
  cfs: CallForSubmissions

  @Field(() => [Reference])
  @OneToMany(() => Reference, references => references.candidate)
  references = new Collection<Reference>(this)
}
