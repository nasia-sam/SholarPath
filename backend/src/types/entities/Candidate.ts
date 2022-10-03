import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, Enum, OneToOne, ManyToOne, PrimaryKey, Property, Embedded } from '@mikro-orm/core'
import { GraphQLJSONObject } from 'graphql-type-json'

import { v4 } from 'uuid'

// import { JsonType } from '../classes/microORM/JSONType'
import { PdfFile } from '../classes/PdfFile'
import { Gender } from '../enums/Gender'

import { Submission } from './Submission'
import { CallForSubmissions } from './CallForSubmissions'
import { References } from '../classes/Referencies'

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
  attachedDocuments?: PdfFile[]

  @Property()
  @Field()
  course_id: string

  @Embedded(() => References, { array: true })
  @Field(() => [GraphQLJSONObject], { nullable: true })
  referencies: References

  @OneToOne(() => Submission, submission => submission.candidate, { nullable: true })
  submission?: Submission

  @ManyToOne(() => CallForSubmissions)
  @Field(() => CallForSubmissions)
  cfs: CallForSubmissions // todo relationship with candidate
}
