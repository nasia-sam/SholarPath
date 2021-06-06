import { registerEnumType } from 'type-graphql'

export enum SubmissionState {
  submitted = 'submitted',
  reviewed = 'reviewed',
  accepted = 'accepted',
  declined = 'declined'
}

registerEnumType(SubmissionState, {
  name: 'SubmissionState'
})
