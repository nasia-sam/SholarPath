import { defineStore } from 'pinia'

import jwtDecode from 'jwt-decode'

export const useloggedUser = defineStore('loggedUser', {
  state: () => ({
    user: undefined,
    authToken: ''
  }),
  getters: {
    isAuthenticated: () => localStorage.getItem('msc_app_token')
  },
  actions: {
    setLogin (token) {
      this.user = jwtDecode(token)
      this.authToken = token
      localStorage.setItem('msc_app_token', token)
    }
  }
})

export default useloggedUser
