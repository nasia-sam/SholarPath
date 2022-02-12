import { IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class PdfFile {
  @Field()
  @IsString()
  path: string

  @Field()
  @IsString()
  name: string

  @Field()
  @IsString()
  extension: string
}
