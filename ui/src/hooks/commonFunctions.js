import { format } from 'date-fns'

export const formatDate = (day, dateForm = 'dd/MM/y') => {
  return format(new Date(day), dateForm)
}
