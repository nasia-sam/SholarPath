import gql from 'graphql-tag'

export const createCfs = gql`
  mutation createCFS ($data: CallForSubmissionsInput!) {
    cfp: createCFS (data: $data) {
      id
    }
  }
`
