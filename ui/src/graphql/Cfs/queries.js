import gql from 'graphql-tag'

export const getCFSByCourse = gql`
  query getCFSByCourse ($slug: String!) {
    cfs: getCFSByCourse (slug: $slug) {
      id
      openFrom
      closeAt
      state
      courseProgram {
        gradeFields
      }
    }
  }
`
