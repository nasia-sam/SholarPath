import gql from 'graphql-tag'

export const createCourseProgram = gql`
  mutation createCourseProgram ($data: CourseProgramInput!) {
    courses: createCourseProgram (data: $data) {
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
  mutation udpdateCourseProgram ($id: String!, $data: CourseProgramInput!) {
    course: updateCourseProgram (id: $id, data: $data) {
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
