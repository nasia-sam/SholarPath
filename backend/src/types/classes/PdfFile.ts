import { Embeddable, Property } from '@mikro-orm/core'
import { Field } from 'type-graphql'

@Embeddable()
export class PdfFile {
  @Field()
  @Property()
    path: string

  @Field()
  @Property()
    type: string

  @Field()
  @Property()
    name: string

  @Field()
  @Property()
    extension: string
}
