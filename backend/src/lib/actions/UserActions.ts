import { EntityManager } from '@mikro-orm/core'
import { Invitation } from 'src/types/entities/Invitation'

import { User } from 'src/types/entities/User'
import { InvitationState } from 'src/types/enums/InvitationState'

export async function getInvitedUsersAction (inviter: User, em: EntityManager): Promise<User[]> {
  const emails = (await em.find(Invitation, { invited_by: inviter.id })).map(inv => inv.email)
  const users = await em.find(User, { email: { $in: emails } }, { populate: ['roles', 'roles.course'] })

  return users
}

export async function getPendingInvitationsAction (userId: string, em: EntityManager): Promise<Invitation[]> {
  const invitations = await em.find(Invitation, {
    state: InvitationState.SEND,
    invited_by: userId
  })

  return invitations
}

// export async function updateUserAction (id: string, data: UserInput, em: EntityManager): Promise<User> {
//   const user = await em.findOneOrFail(User, id)

//   user.email = data.email
//   user.name = data.name

//   await em.flush()
//   return user
// }

export async function deleteUserAction (id: string, em: EntityManager): Promise<boolean> {
  const user = await em.findOneOrFail(User, id, { populate: ['roles'] })
  await em.removeAndFlush(user)
  return true
}
