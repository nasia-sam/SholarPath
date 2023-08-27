import { IsUUID } from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { AdditionalFilesInput } from './AdditionalFiles'

@InputType()
export class CallForSubmissionsInput {
  @Field()
    openFrom: Date

  @Field()
    closeAt: Date

  @Field(() => AdditionalFilesInput)
    documents: AdditionalFilesInput

  @Field()
  @IsUUID()
    courseProgram: string
}
