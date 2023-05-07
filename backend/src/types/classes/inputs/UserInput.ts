import { IsEmail, IsUUID, Min } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  email: string

  @Field()
  name: string

  @Field()
  @IsUUID()
  invitation: string

  @Field()
  @Min(6)
  password: string
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string

  @Field()
  password: string
}
