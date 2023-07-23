import gql from 'graphql-tag'

export const createRole = gql`
  mutation createRole ($userId: String!, $courseId: String!) {
    createRole (userId: $userId, courseId: $courseId) {
      id
    }
  }
`
