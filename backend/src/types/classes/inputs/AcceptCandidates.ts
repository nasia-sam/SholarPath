import { Field, InputType } from 'type-graphql'
import { IsInt, IsUUID } from 'class-validator'

@InputType()
export class AcceptCandidatesInput {
  @Field()
  @IsInt()
  capacity: number

  @Field()
  deadline: Date

  @Field()
  waitlistDeadline: Date

  @Field()
  @IsUUID()
  cfsId: string
}
