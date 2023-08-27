import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from 'src/dependencies/Config'
import { type User } from 'src/types/entities/User'

export const generateToken = (payload: User): string => {
  const token = jwt.sign(
    { data: payload },
    TOKEN_SECRET
  )

  return token
}

export const verifyToken = (token: string): boolean => {
  const result = jwt.verify(token, TOKEN_SECRET) as User

  return !!result.id
}
