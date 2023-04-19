import gql from 'graphql-tag'

export const getCandidatesByCfs = gql`
  query getCandidates ($id: String!) {
    candidates: getCandidatesByCfs (id: $id) {
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
      course_id
      attachedDocuments
      references {
        token
      }
      cfs {
        id
      }
      totalGrade
    }
  }
`

export const getCandidateById = gql`
  query getCandidateById ($id: String!) {
    candidate: getCandidateById (id: $id) {
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
      course_id
      cfs {
        id
      }
      review
    }
  }
`
