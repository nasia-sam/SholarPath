import { errorMessage } from 'src/hooks/globalNotifications'
import useloggedUser from 'src/store/auth'

export const isLogged = (_to, from, next) => {
  if (useloggedUser().isAuthenticated) next()
  else {
    errorMessage('Δεν επιτρέπεται η πρόσβαση.')
    next(from.fullPath)
  }
}

export const isAdmin = (_to, from, next) => {
  if (useloggedUser().isAdmin) next()
  else {
    errorMessage('Δεν επιτρέπεται η πρόσβαση.')
    next(from.fullPath)
  }
}
