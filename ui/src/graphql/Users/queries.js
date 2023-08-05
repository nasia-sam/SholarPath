import gql from 'graphql-tag'

export const getInvitedUsers = gql`
  query getInvitedUsers {
    users: getInvitedUsers {
      id
      email
      name
      is_admin
      roles {
        id
        role
        course {
          id
          title
        }
      }
    }
  }
`

export const getPendingInvitations = gql`
  query getPendingInvitations {
    invitations: getPendingInvitations {
      id
      email
    }
  }
`
