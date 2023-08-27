import { registerEnumType } from 'type-graphql'

export enum InvitationState {
  SEND = 'SEND',
  ACCEPTED = 'ACCEPTED'

}
registerEnumType(InvitationState, {
  name: 'InvitationState'
})
