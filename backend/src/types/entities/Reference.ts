import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'
import { Candidate } from './Candidate'

@Entity()
@ObjectType()
export class Reference {
  @PrimaryKey()
  @Field(() => ID)
    token: string = v4()

  @Property({ nullable: true })
  @Field({ nullable: true })
    title?: string // Dr Professor mr

  @Property()
  @Field()
    name?: string

  @Property()
  @Field()
    email: string

  @Property({ columnType: 'text', nullable: true })
  @Field({ nullable: true })
    letter?: string

  @Property()
  @Field()
    expiresAt: Date

  @Property({ nullable: true })
  @Field(() => Date, { nullable: true })
    submittedAt?: Date

  @ManyToOne(() => Candidate)
  @Field(() => Candidate)
    candidate: Candidate
}
