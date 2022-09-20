import { registerEnumType } from 'type-graphql'

export enum SubmissionState {
  submitted = 'submitted',
  processing = 'processing',
  reviewed = 'reviewed',
  accepted = 'accepted',
  declined = 'declined'
}

registerEnumType(SubmissionState, {
  name: 'SubmissionState'
})
