import dotenv from 'dotenv'
import Debug from 'debug'
dotenv.config()

export const ENVIRONMENT = process.env.NODE_ENV as string || 'development'

export const HOST = process.env.HOST as string || '127.0.0.1'

export const PORT = parseInt(process.env.PORT as string) || 9999

export const DEBUG = process.env.DEBUG as string || ''

export const EMAIL_NAME = process.env.EMAIL_NAME as string || 'PMS'

export const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS as string || 'noreply@example.com'

export const USER_EMAIL = process.env.USER_EMAIL as string || ''

export const USER_EMAIL_PWD = process.env.USER_EMAIL_PWD as string || ''

Debug.enable(DEBUG)
