import { EntityManager } from '@mikro-orm/core'
import { UserInputError } from 'apollo-server-errors'

import { UserInput } from 'src/types/classes/inputs/UserInput'
import { User } from 'src/types/entities/User'

export async function createUserAction (data: UserInput, em: EntityManager): Promise<User> {
  const emailExisting = await em.findOne(User, { email: data.email })
  if (emailExisting && emailExisting.email === data.email) {
    throw new UserInputError('EMAIL_ALREADY_EXISTS')
  }

  const user = em.create(User, {
    email: data.email,
    name: data.name,
    confirm_email: false,
    confirmed_by_admin: false
  })

  await em.persistAndFlush(user)
  return user
}

export async function updateUserAction (id: string, data: UserInput, em: EntityManager): Promise<User> {
  const user = await em.findOneOrFail(User, id)

  user.email = data.email
  user.name = data.name

  await em.flush()
  return user
}

export async function deleteUserAction (id: string, em: EntityManager): Promise<boolean> {
  const user = await em.findOneOrFail(User, id, ['roles'])
  await em.removeAndFlush(user)
  return true
}
