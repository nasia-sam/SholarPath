import { registerEnumType } from 'type-graphql'

export enum Gender {
  male = 'male',
  femate = 'femate',
  other = 'other'
}
registerEnumType(Gender, {
  name: 'Gender'
})
