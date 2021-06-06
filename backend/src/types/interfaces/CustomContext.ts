import { EntityManager } from '@mikro-orm/core'
import { Context } from 'koa'
import { User } from '../entities/User'

export interface CustomContext {
  ctx: Context

  em: EntityManager

  state: {
    user?: User
  }

  user?: User
}
