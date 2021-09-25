import 'reflect-metadata'

import { createServer } from 'http'
import Koa, { Context } from 'koa'
import cors from '@koa/cors'
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

async function main (): Promise<void> {
  const connection = await MikroORM.init()

  console.log('=== BUILDING GQL SCHEMA ===')
  const schema = await buildSchema({
    resolvers: [
      CoreResolver,
      CourseProgramResolver,
      CallForSubmissionsResolver,
      CandidateResolver,
      RolesResolver
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

  app.use(cors())
  app.use(graphqlUploadKoa())
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