import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, Enum, OneToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { GraphQLJSONObject } from 'graphql-type-json'

import { v4 } from 'uuid'

import { JsonType } from '../classes/microORM/JSONType'
import { PdfFile } from '../classes/PdfFile'
import { Submission } from './Submission'
import { Gender } from '../enums/Gender'

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

  @Property({ type: JsonType })
  @Field(() => GraphQLJSONObject, { nullable: true })
  cv?: PdfFile

  @Property()
  @Field()
  course_id: string

  @OneToOne(() => Submission, submission => submission.candidate, { nullable: true })
  submission?: Submission
}
