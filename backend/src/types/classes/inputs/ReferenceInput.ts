import { Field, InputType } from 'type-graphql'

import { IsString, IsUUID } from 'class-validator'

@InputType()
export class ReferenceInput {
  @Field()
  @IsString()
  name: string

  @Field()
  @IsString()
  title: string // Dr Professor mr

  @Field()
  @IsString()
  letter: string

  @Field()
  @IsUUID()
  candidateId: string
}
