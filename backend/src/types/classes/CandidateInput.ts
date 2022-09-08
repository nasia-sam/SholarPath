import { Field, InputType } from 'type-graphql'
import { Gender } from '../enums/Gender'

@InputType()
export class CandidateInput {
  @Field()
  name: string

  @Field()
  surname: string

  @Field()
  father_name: string

  @Field()
  email: string

  @Field()
  age: number

  @Field()
  address: string

  @Field()
  zip_code: string

  @Field()
  phone_number: string

  @Field()
  part_time: boolean

  @Field()
  bachelor_degree: string

  @Field(() => Gender)
  gender: Gender

  @Field()
  course_id: string

  @Field(() => String, { nullable: true })
  cv?: string
}
