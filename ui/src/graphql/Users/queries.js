import gql from 'graphql-tag'

export const getInvitedUsers = gql`
  query getInvitedUsers {
    users: getInvitedUsers {
      id
      email
      roles {
        role
        course {
          title
        }
      }
    }
  }
`
