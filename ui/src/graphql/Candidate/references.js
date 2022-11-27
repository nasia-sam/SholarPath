import gql from 'graphql-tag'

export const getReferenceByToken = gql`
  query getReferenceByToken ($token: String!) {
    reference: getReferenceByToken (token: $token) {
      title
      name
      email
      letter
      expiresAt
      submittedAt
      candidate {
        id
        name
        surname
      }
    }
  }
`

export const writeReference = gql`
  mutation writeReference ($data: ReferenceInput!, $token: String!) {
    writeReference (data: $data, token: $token)
  }
`
