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

export const extendCFS = gql`
  mutation extendCFS ($id: String!, $closeAt: String!) {
    extendCFS (id: $id, closeAt: $closeAt) {
     id
    }
  }
`
