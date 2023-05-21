import { ref } from 'vue'
import { api } from 'src/boot/axios'

// gql
import { print } from 'graphql'
import { getInvitationByToken } from 'src/graphql/Authentication/queries'
import { registerUserMutation, inviteUserMutation } from 'src/graphql/Authentication/mutations'
import { errorMessage, successMessage } from '../globalNotifications'

export default function useRegistrationActions () {
  const invitation = ref([])
  const registrationResult = ref()
  const loading = ref(false)

  const fetchInvitation = async (token) => {
    try {
      loading.value = true

      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(getInvitationByToken),
          variables: {
            token: token
          }
        }
      })

      if (response.data.data.invitation) {
        invitation.value = response.data.data.invitation
      } else {
        errorMessage('Error while Fetching Invitation')
      }
    } catch (err) {
      errorMessage('Error while Fetching Invitation')
    } finally {
      loading.value = false
    }
  }

  const inviteUser = async (email) => {
    try {
      loading.value = true

      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(inviteUserMutation),
          variables: {
            email
          }
        }
      })
      if (response.data.data.registerUser) {
        successMessage('User Invited')
      } else {
        errorMessage('Error while User Invitation')
      }
    } catch (err) {
      errorMessage('Error while User Invitation')
    } finally {
      loading.value = false
    }
  }

  const registerUser = async (data) => {
    try {
      loading.value = true

      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(registerUserMutation),
          variables: {
            data
          }
        }
      })
      if (response.data.data.registerUser) {
        registrationResult.value = response.data.data.registerUser
      } else {
        errorMessage('Error while User Registration')
        registrationResult.value = false
      }
    } catch (err) {
      errorMessage('Error at User Registration')
      registrationResult.value = false
    } finally {
      loading.value = false
    }
  }

  return {
    fetchInvitation,
    loading,
    invitation,
    registerUser,
    registrationResult,
    inviteUser
  }
}
