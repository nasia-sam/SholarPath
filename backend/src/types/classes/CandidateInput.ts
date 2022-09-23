import { Field, InputType } from 'type-graphql'
import { IsEmail, IsUUID, Length } from 'class-validator'

import { Gender } from '../enums/Gender'

@InputType()
export class CandidateInput {
  @Field()
  @Length(1)
  name: string

  @Field()
  @IsUUID()
  cfs: string

  @Field()
  @Length(1)
  surname: string

  @Field()
  @Length(1)
  father_name: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  @Length(1)
  age: number

  @Field()
  @Length(1)
  address: string

  @Field()
  @Length(1)
  zip_code: string

  @Field()
  @Length(1)
  phone_number: string

  @Field()
  @Length(1)
  part_time: boolean

  @Field()
  @Length(1)
  bachelor_degree: string

  @Field(() => Gender)
  gender: Gender

  @Field()
  @IsUUID()
  course_id: string

  @Field(() => String, { nullable: true })
  cv?: string
}
