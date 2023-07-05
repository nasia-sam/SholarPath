import { Field, InputType } from 'type-graphql'

@InputType()
export class AcceptCandidatesInput {
  @Field()
  capacity: number

  @Field()
  deadline: Date

  @Field()
  waitlistDeadline: Date

  @Field()
  cfsId: string
}
