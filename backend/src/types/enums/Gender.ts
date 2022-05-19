import { registerEnumType } from 'type-graphql'

export enum Gender {
  male = 'M',
  female = 'F',
  other = 'O'
}
registerEnumType(Gender, {
  name: 'Gender'
})
