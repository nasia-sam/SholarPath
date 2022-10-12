import { Field, InputType, ObjectType } from 'type-graphql'
import { IsBoolean, IsEmail, IsInt, IsUUID, Length, Min } from 'class-validator'

import { Gender } from '../../enums/Gender'

// import { GraphQLJSONObject } from 'graphql-type-json'

@ObjectType()
export class personalInfo {
  @Field()
  name: string

  @Field()
  email: string
}

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
  @IsInt()
  @Min(18)
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
  @IsBoolean()
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

  @Field(() => String, { nullable: true })
  proofDegree?: string

  @Field(() => [String], { nullable: true })
  otherMasters?: string[]

  @Field(() => [String], { nullable: true })
  referenceInfo?: string[]

  // @Field(() => [GraphQLJSONObject], { nullable: true })
  // referenceInfo?: personalInfo[]
}
