import { registerEnumType } from 'type-graphql'

export enum Candidate_State {
  submitted = 'submitted',
  approved = 'approved',
  waitList = 'waitList'
}

registerEnumType(Candidate_State, {
  name: 'Candidate_State'
})
