import { type Context } from 'koa'
import Router from 'koa-router'
import send from 'koa-send'
import path from 'path'

const uploadsRouter = new Router()

uploadsRouter.get('/uploads/:folder/:file', async (ctx: Context) => {
  const filePath = path.join('src', 'uploads', ctx.params.folder, ctx.params.file)
  await send(ctx, filePath)
})

export default uploadsRouter
