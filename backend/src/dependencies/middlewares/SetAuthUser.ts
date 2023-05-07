import { Next } from 'koa'
import jwt from 'jsonwebtoken'

import { User } from 'src/types/entities/User'
import { CustomContext } from 'src/types/interfaces/CustomContext'
import { TOKEN_SECRET } from 'src/dependencies/Config'

export async function setAuthUser (ctx: CustomContext, next: Next): Promise<void> {
  const token = ctx.ctx.header.authorization

  const bearer = token?.split(':')[1].trim()

  if (token && bearer) {
    const user = jwt.verify(bearer, TOKEN_SECRET) as User

    ctx.user = user
  }

  await next()
}
