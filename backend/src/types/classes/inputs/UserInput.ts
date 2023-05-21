import { IsEmail, IsUUID, Length } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UserInput {
  @Field()
  name: string

  @Field()
  @IsUUID()
  invitation: string

  @Field()
  @Length(6)
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
