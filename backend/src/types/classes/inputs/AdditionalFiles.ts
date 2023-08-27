import { InputType, Field } from 'type-graphql'

@InputType()
export class AdditionalFilesInput {
  @Field()
    proofDegree: boolean

  @Field()
    otherMasters: boolean

  @Field()
    references: boolean

  @Field()
    numberOfReferencies: number
}
