import { registerEnumType } from 'type-graphql'

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}
registerEnumType(Gender, {
  name: 'Gender'
})
