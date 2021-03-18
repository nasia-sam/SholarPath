import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'
import { Submission } from './Submission'

export enum Gender {
  male = 'M',
  female = 'F',
  other = 'O'
}

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
  bachelor_digree: string

  @Property()
  @Field()
  part_time: boolean

  @Property()
  @Field()
  gender: Gender

  @OneToOne(() => Submission, submission => submission.candidate, { owner: true, orphanRemoval: true })
  @Field(() => Submission)
  submission: Submission
}