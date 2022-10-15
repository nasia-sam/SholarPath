import gql from 'graphql-tag'

export const createCfs = gql`
  mutation createCFS ($data: CallForSubmissionsInput!) {
    cfp: createCFS (data: $data) {
      id
    }
  }
`

export const updateCfs = gql`
  mutation updateCFS ($id: String!, $data: CallForSubmissionsInput!) {
    updateCFS (id: $id, data: $data) {
      id
    }
  }
`
