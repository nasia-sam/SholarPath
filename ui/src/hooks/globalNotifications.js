import { Notify } from 'quasar'

export const errorMessage = (msg = 'An Error occurred') => Notify.create({
  icon: 'error',
  message: msg,
  position: 'top',
  color: 'negative'
})

export const successMessage = (msg = 'Success') => Notify.create({
  icon: 'check_circle',
  message: msg,
  position: 'top',
  color: 'positive'
})
