import { registerEnumType } from 'type-graphql'

export enum InvitationState {
  SEND,
  ACCEPTED

}
registerEnumType(InvitationState, {
  name: 'InvitationState'
})
