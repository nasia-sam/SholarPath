import dotenv from 'dotenv'
import Debug from 'debug'
dotenv.config()

export const ENVIRONMENT = process.env.NODE_ENV as string || 'development'

export const HOST = process.env.HOST as string || '127.0.0.1'

export const PORT = parseInt(process.env.PORT as string) || 9999

export const DEBUG = process.env.DEBUG as string || ''

export const DB_HOST = process.env.DB_HOST as string || 'localhosst'

export const DB_NAME = process.env.DB_NAME as string || 'demo_db'

export const DB_USER = process.env.DB_USER as string || 'user'

export const DB_PORT = parseInt(process.env.DB_PORT as string) || 3306

export const DB_PASSWORD = process.env.DB_PASSWORD as string || ''

export const EMAIL_NAME = process.env.EMAIL_NAME as string || 'PMS'

export const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS as string || 'noreply@example.com'

export const USER_EMAIL = process.env.USER_EMAIL as string || ''

export const USER_EMAIL_PWD = process.env.USER_EMAIL_PWD as string || ''

export const CLIENT_URL = process.env.CLIENT_URL as string || 'localhost:8080/'

export const TOKEN_SECRET = process.env.TOKEN_SECRET as string || 's3creT'

export const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION as string || '1h'

Debug.enable(DEBUG)
