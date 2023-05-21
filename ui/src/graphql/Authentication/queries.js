import gql from 'graphql-tag'

export const getInvitationByToken = gql`
  query getInvitationByToken ($token: String!) {
    invitation: getInvitationByToken (token: $token) {
      id
      email
      state
      invited_by {
        name
      }
    }
  }
`
