import { IsInt, IsUUID } from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { Embeddable, Property } from '@mikro-orm/core'

@Embeddable()
export class ReviewGrade {
  @Field()
  @Property()
    key: string

  @Field()
  @IsInt()
  @Property()
    grade: number
}

@InputType()
export class ReviewInput {
  @Field()
  @IsUUID()
    candidate: string

  @Field(() => [GraphQLJSONObject])
    review: ReviewGrade[]
}
