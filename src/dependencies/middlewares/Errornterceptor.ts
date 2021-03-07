import { MiddlewareFn } from 'type-graphql'
import { CustomContext } from 'src/types/interfaces/CustomContext'

export const Errornterceptor: MiddlewareFn<CustomContext> = async ({ context }, next): Promise<void> => {
  try {
    await next()
  } catch (err) {
    console.log(err)
    context.ctx.status = 500
    context.ctx.body = {
      error: 'INTERNAL_ERROR'
    }
  }
}
