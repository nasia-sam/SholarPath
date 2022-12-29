import gql from 'graphql-tag'

export const createCandidate = gql`
  mutation createCandidate ($data: CandidateInput!) {
    createCandidate (data: $data) {
      id
    }
  }
`

export const gradeCandidate = gql`
  mutation gradeCandidate ($data: ReviewInput!) {
    gradeCandidate (data: $data)
  }
`
