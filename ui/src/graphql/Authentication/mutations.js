import gql from 'graphql-tag'

export const registerUserMutation = gql`
  mutation registerUser ($data: UserInput!) {
    registerUser (data: $data)
  }
`

export const inviteUserMutation = gql`
  mutation inviteUser ($email: String!) {
    inviteUser (email: $email)
  }
`
export const loginUserMutation = gql`
  mutation loginUser ($data: LoginInput!) {
    loginUser (data: $data)
  }
`
