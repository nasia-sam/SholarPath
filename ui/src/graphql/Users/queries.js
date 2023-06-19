import gql from 'graphql-tag'

export const getInvitedUsers = gql`
  query getInvitedUsers {
    users: getInvitedUsers {
      id
      email
      name
      roles {
        role
        course {
          title
        }
      }
    }
  }
`
