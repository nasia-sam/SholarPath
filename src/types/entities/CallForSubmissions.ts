import { Field, ID, ObjectType } from 'type-graphql'
import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'

import { CourseProgram } from 'src/types/entities/CourseProgram'
import { Role } from 'src/types/entities/Role'

export enum CFS_State {
  draft = 'draft',
  open = 'open',
  closed = 'closed'
}

@Entity()
@ObjectType()
export class CallForSubmissions {
  @PrimaryKey()
  @Field(() => ID)
  id: string = v4()

  @Property({ nullable: true })
  @Field(() => Date, { nullable: true })
  openFrom?: Date

  @Property({ nullable: true })
  @Field(() => Date, { nullable: true })
  closeAt?: Date

  @Property()
  @Field()
  documents: string[]

  @Property()
  @Field()
  state: CFS_State

  @Property()
  @Field(() => Date)
  year: Date

  @OneToMany(() => Role, role => role.cfs)
  @Field(() => [Role])
  roles = new Collection<Role>(this)

  @ManyToOne(() => CourseProgram)
  @Field(() => CourseProgram)
  CourseProgram: CourseProgram
}
