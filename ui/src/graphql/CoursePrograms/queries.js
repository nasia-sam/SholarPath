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

export const getCourseProgramBySlug = gql`
  query getCourcebySlug ($slug: String!) {
    course: getCourcebySlug(slug: $slug) {
      id
      slug
      university
      department
      title
      description
      open
      sitelink
      title
      gradeFields
      currentCFS {
        id
        openFrom
        closeAt
        state
        documents
      }
      roles {
        id
        user {
          name
        }
        role
      }
      cfs {
        id
        openFrom
        closeAt
      }
    }
  }
`
