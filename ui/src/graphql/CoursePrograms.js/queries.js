import gql from 'graphql-tag'

export const getAllCoursesQuery = gql`
  query getCourses {
    courses: getAllCoursePrograms {
      id
      slug
      university
      department
      title
      description
      open
      sitelink
      roles {
        id
        role
        user {
          id
          name
          confirm_email
          confirmed_by_admin
          email
        }
      }
    }
  }
`
