import gql from 'graphql-tag'

export const createCourseProgram = gql`
  mutation createCourseProgram ($data: CourseProgramInput!, $gradeFields: [GradeFieldsInput!]!) {
    course: createCourseProgram (data: $data, gradeFields: $gradeFields) {
      id
      slug
      university
      department
      title
      description
      open
      sitelink
    }
  }
`

export const updateCourseProgram = gql`
  mutation udpdateCourseProgram ($id: String!, $data: CourseProgramInput!, $gradeFields: [GradeFieldsInput!]!) {
    course: updateCourseProgram (id: $id, data: $data, gradeFields: $gradeFields) {
      id
      slug
      university
      department
      title
      description
      open
      sitelink
    }
  }
`

export const deleteCourseProgram = gql`
  mutation deleteCourseProgram ($id: String!) {
    deleteCourseProgram (id: $id)
  }
`
