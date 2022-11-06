import { Embeddable, Property } from '@mikro-orm/core'

@Embeddable()
export class References {
  @Property({ nullable: true })
  name: string

  @Property({ nullable: true })
  email: string

  @Property({ nullable: true })
  title: string // Dr Professor mr

  @Property({ columnType: 'text', nullable: true })
  letter: string

  @Property({ nullable: true })
  token: string

  @Property({ nullable: true })
  expiresAt: Date

  @Property({ nullable: true })
  candidateId: string

  @Property({ nullable: true })
  submittedAt?: Date
}
