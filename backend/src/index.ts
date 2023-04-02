import 'reflect-metadata'

import { createServer } from 'http'
import Koa, { Context } from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'

import { ApolloServer } from 'apollo-server-koa'
import { buildSchema } from 'type-graphql'
import { MikroORM } from '@mikro-orm/core'
import { graphqlUploadKoa } from 'graphql-upload'

import { PORT, HOST, ENVIRONMENT } from 'src/dependencies/Config'

import { Errornterceptor } from './dependencies/middlewares/Errornterceptor'
import { CustomContext } from './types/interfaces/CustomContext'

import { CoreResolver } from './lib/resolvers/CoreResolver'
import { CourseProgramResolver } from './lib/resolvers/CourseProgramResolver'
import { CallForSubmissionsResolver } from './lib/resolvers/CallForSubmissionsResolver'
import { CandidateResolver } from './lib/resolvers/CandidateResolver'
import { RolesResolver } from './lib/resolvers/RolesResolver'
import { ReferenceResolver } from './lib/resolvers/ReferenceResolver'

import uploadsRouter from 'src/routes/uploads'

async function main (): Promise<void> {
  const connection = await MikroORM.init()

  console.log('=== BUILDING GQL SCHEMA ===')
  const schema = await buildSchema({
    resolvers: [
      CoreResolver,
      CourseProgramResolver,
      CallForSubmissionsResolver,
      CandidateResolver,
      RolesResolver,
      ReferenceResolver
    ],
    globalMiddlewares: [Errornterceptor]
  })

  const apolloServer = new ApolloServer({
    schema,
    context ({ ctx }: { ctx: Context }): CustomContext {
      return {
        ctx,
        state: ctx.state,
        em: connection.em.fork()
      }
    },
    uploads: false
  })

  const app = new Koa()
  if (ENVIRONMENT === 'production') {
    app.proxy = true
  }

  app.use(uploadsRouter.routes())

  app.use(cors())
  app.use(graphqlUploadKoa())
  app.use(bodyParser({ jsonLimit: '150mb' }))

  app.use(apolloServer.getMiddleware({ cors: false }))
  const httpServer = createServer(app.callback())

  httpServer.listen({ port: PORT }, () => {
    console.log(`http://${HOST}:${PORT}/graphql`)
  })
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
