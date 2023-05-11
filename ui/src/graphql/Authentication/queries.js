import gql from 'graphql-tag'

export const getInvitationByToken = gql`
  query getInvitationByToken ($token: String!) {
    invitation: getInvitationByToken (id: $id) {
      id
      email
      state
    }
  }
`
