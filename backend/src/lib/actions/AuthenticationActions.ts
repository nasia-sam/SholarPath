import bcrypt from 'bcrypt'
import { type EntityManager } from '@mikro-orm/core'
import { ValidationError, AuthenticationError } from 'apollo-server-koa'

import { User } from 'src/types/entities/User'
import { Invitation } from 'src/types/entities/Invitation'
import { type LoginInput, type UserInput } from 'src/types/classes/inputs/UserInput'
import { InvitationState } from 'src/types/enums/InvitationState'
import { generateToken, verifyToken } from 'src/utils/token'
import { sendInvitationContent } from 'src/utils/emailContent/invitation'
import { v4 } from 'uuid'

export async function getInvitationByTokenAction (token: string, em: EntityManager): Promise<Invitation> {
  const invitation = await em.findOneOrFail(Invitation, { id: token }, { populate: ['invited_by'] })

  return invitation
}

export async function inviteUserAction (email: string, user: User, em: EntityManager): Promise<boolean> {
  const invitation = em.create(Invitation, {
    id: v4(),
    email,
    invited_by: user.id,
    state: InvitationState.SEND
  })

  await em.persistAndFlush(invitation)

  await sendInvitationContent(email, invitation.id, user)

  return true
}

export async function registerUserAction (payload: UserInput, em: EntityManager): Promise<boolean> {
  const invitation = await em.findOneOrFail(Invitation, { id: payload.invitation })

  const hash = bcrypt.hashSync(payload.password, 12)

  const user = em.create(User, {
    email: invitation.email,
    name: payload.name,
    is_admin: false,
    password: hash
  })
  em.persist(user)

  invitation.state = InvitationState.ACCEPTED

  await em.flush()

  return true
}

export async function loginAction (payload: LoginInput, em: EntityManager): Promise<string> {
  const user = await em.findOneOrFail(User, { email: payload.email })

  if (!bcrypt.compareSync(payload.password, user.password)) throw new ValidationError('INVALID_CREDENTIALS')

  return generateToken(user)
}

export function refreshToken (token: string, user: User): string {
  const isValid = verifyToken(token)
  if (!isValid) throw new AuthenticationError('INVALID_TOKEN')

  return generateToken(user)
}
