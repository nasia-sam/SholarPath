import { registerEnumType } from 'type-graphql'

export enum CFS_State {
  published = 'published',
  open = 'open',
  closed = 'closed',
  done = 'done'
}

registerEnumType(CFS_State, {
  name: 'CFS_State'
})
