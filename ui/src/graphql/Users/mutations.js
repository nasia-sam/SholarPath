import gql from 'graphql-tag'

export const addAdmin = gql`
  mutation giveAdminRights ($id: String!) {
    giveAdminRights (id: $id)
  }
`
