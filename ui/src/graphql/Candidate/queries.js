import gql from 'graphql-tag'

export const getCandidatesByCourse = gql`
  query getCandidates ($id: String!) {
    candidates: getCandidatesByCourseId (id: $id) {
      id
      name
      surname
      father_name
      age
      address
      zip_code
      phone_number
      email
      bachelor_degree
      part_time
      gender
      cv?
      course_id
      submission{
        id
      }
      cfs {
        id
      }
    }
  }
`
