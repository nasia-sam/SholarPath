import { defineStore } from 'pinia'

import jwtDecode from 'jwt-decode'
import { successMessage } from 'src/hooks/globalNotifications'

export const useloggedUser = defineStore('loggedUser', {
  state: () => ({
    user: undefined,
    authToken: ''
  }),
  getters: {
    isAuthenticated: (state) => !!localStorage.getItem('msc_app_token') || !!state.user,
    loggedUser: (state) => state.user ?? undefined,
    isAdmin: (state) => state.user?.is_admin ?? false,
    createdByLogged: (state) => {
      return (userId) => state.user?.id === userId ?? false
    }
  },
  actions: {
    setLogin (token) {
      this.user = jwtDecode(token).data
      this.authToken = token
      localStorage.setItem('msc_app_token', token)
    },
    setUser () {
      const token = localStorage.getItem('msc_app_token')
      if (token) {
        this.user = jwtDecode(token).data
        this.authToken = token
      }
    },
    logout () {
      localStorage.removeItem('msc_app_token')
      this.user = undefined
      this.authToken = ''
      this.isAuthenticated()

      successMessage('Επιτυχής Έξοδος')
    }
  }
})

export default useloggedUser
