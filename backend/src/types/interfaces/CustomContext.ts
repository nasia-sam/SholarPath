import { EntityManager } from '@mikro-orm/core'
import { Context, Request } from 'koa'
import { User } from '../entities/User'

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
