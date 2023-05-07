import { EntityManager } from '@mikro-orm/core'

import { UserInput } from 'src/types/classes/inputs/UserInput'
import { User } from 'src/types/entities/User'

export async function updateUserAction (id: string, data: UserInput, em: EntityManager): Promise<User> {
  const user = await em.findOneOrFail(User, id)

  user.email = data.email
  user.name = data.name

  await em.flush()
  return user
}

export async function deleteUserAction (id: string, em: EntityManager): Promise<boolean> {
  const user = await em.findOneOrFail(User, id, { populate: ['roles'] })
  await em.removeAndFlush(user)
  return true
}
