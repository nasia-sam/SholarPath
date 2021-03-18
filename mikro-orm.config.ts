/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv'

// import { User } from './src/types/entities/User'
// import { CallForSubmissions } from './src/types/entities/CallForSubmissions'
// import { Candidate } from './src/types/entities/Candidate'
// import { Roles } from './src/types/entities/Roles'
// import { CourseProgram } from './src/types/entities/CourseProgram'
// import { Submission } from 'src/types/entities/Submission'
dotenv.config()

const env = process.env

function ENV (path: string, deflt: string): string {
  // return env[path] ? env[path] : deflt
  if (env[path] === 'undefined') {
    return deflt
  }
  return env[path]!
}

function ENV_NUM (path: string, deflt: number): number {
  if (env[path] === 'undefined') {
    return deflt
  }
  return parseInt(env[path]!)
}

export default {
  type: 'mariadb',
  dbName: ENV('DB_DATABASE', 'pms-applications'),
  host: ENV('DB_HOST', 'localhost'),
  port: ENV_NUM('DB_PORT', 3306),
  user: ENV('DB_USER', 'root'),
  password: ENV('DB_PASSWORD', ''),
  debug: true,
  entities: [
    './src/types/entities/*.ts'
  ]
}
