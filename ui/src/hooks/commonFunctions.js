import { format } from 'date-fns'

export const formatDate = (day) => {
  return format(new Date(day), 'dd/MM/y')
}
