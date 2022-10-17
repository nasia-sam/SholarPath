import { Embeddable, Property } from '@mikro-orm/core'

@Embeddable()
export class GradeFields {
  @Property()
  key: string

  @Property()
  title: string

  @Property()
  weigth: number

  @Property()
  min_val: number

  @Property()
  max_val: number
}
