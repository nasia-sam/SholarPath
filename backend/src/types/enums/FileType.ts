import { registerEnumType } from 'type-graphql'

export enum FileType {
  CV = 'CV',
  DEGREE = 'DEGREE',
  MASTER = 'MASTER'
}

registerEnumType(FileType, {
  name: 'CFS_State'
})
