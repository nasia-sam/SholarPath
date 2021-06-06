import { Unique } from '@mikro-orm/core'
import { IsEmail } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UserInput {
  @Field()
  @Unique()
  @IsEmail()
  email: string

  @Field()
  name: string
}
