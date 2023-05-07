import jwt from 'jsonwebtoken'
import { TOKEN_EXPIRATION, TOKEN_SECRET } from 'src/dependencies/Config'
import { User } from 'src/types/entities/User'

export const generateToken = (payload: User): string => {
  const token = jwt.sign(
    { data: payload },
    TOKEN_SECRET,
    { expiresIn: TOKEN_EXPIRATION }
  )

  return token
}

export const verifyToken = (token: string): boolean => {
  const result = jwt.verify(token, TOKEN_SECRET) as User

  return !!result.id
}