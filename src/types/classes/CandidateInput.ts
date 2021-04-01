import { Field, InputType } from 'type-graphql'

@InputType()
export class CandidateInput {
  @Field()
  name: string

  @Field()
  surname: string

  @Field()
  father_name: string

  @Field()
  address: string

  @Field()
  zip_code: string

  @Field()
  phone_number: string

  @Field()
  part_time: boolean

  @Field()
  bachelor_digree: string

  @Field()
  gender: string
}
