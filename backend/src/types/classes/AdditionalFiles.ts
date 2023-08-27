import { Embeddable, Property } from '@mikro-orm/core'

@Embeddable()
export class AdditionalFiles {
  @Property()
    proofDegree: boolean

  @Property()
    otherMasters: boolean

  @Property()
    references: boolean

  @Property()
    numberOfReferencies: number
}
