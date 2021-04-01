import { IsUUID } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class CallForSubmissionsInput {
  @Field()
  openFrom: Date

  @Field()
  closeAt: Date

  @Field(() => [String])
  documents: string[]

  @Field()
  year: Date

  @Field()
  @IsUUID()
  courseProgram: string
}
