import { type Next } from 'koa'
import jwt, { type JwtPayload } from 'jsonwebtoken'

import { type CustomContext } from 'src/types/interfaces/CustomContext'
import { TOKEN_SECRET } from 'src/dependencies/Config'

export async function setAuthUser (ctx: CustomContext, next: Next): Promise<void> {
  const token = ctx.request?.header?.authorization

  const bearer = token?.split(' ')[1].trim()

  if (token && bearer) {
    try {
      const decoded = jwt.verify(bearer, TOKEN_SECRET) as JwtPayload
      ctx.user = decoded.data
    } catch (err) {
      ctx.user = undefined
    }
  }

  await next()
}
