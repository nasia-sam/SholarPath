import { type EntityManager } from '@mikro-orm/core'
import { type Context, type Request } from 'koa'
import { type User } from '../entities/User'

export interface CustomContext {
  ctx: Context

  em: EntityManager
  request?: Request

  state: {
    user?: User
  }

  user?: User
}

export interface AuthCustomContext extends CustomContext {
  user: User
}
