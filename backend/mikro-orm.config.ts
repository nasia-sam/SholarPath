/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DB_HOST, DB_NAME, DB_PORT, DB_PASSWORD, DB_USER } from './src/dependencies/Config'

// import { User } from './src/types/entities/User'
// import { CallForSubmissions } from './src/types/entities/CallForSubmissions'
// import { Candidate } from './src/types/entities/Candidate'
// import { Roles } from './src/types/entities/Roles'
// import { CourseProgram } from './src/types/entities/CourseProgram'
// import { Submission } from 'src/types/entities/Submission'

export default {
  type: 'mariadb',
  dbName: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  debug: true,
  entities: [
    './src/types/entities/*.ts'
  ]
}
