import { ref } from 'vue'
import { api } from 'src/boot/axios'

// GQL
import { print } from 'graphql'
import { getInvitedUsers } from 'src/graphql/Users/queries'
import { inviteUserMutation } from 'src/graphql/Authentication/mutations'
import { errorMessage, successMessage } from '../globalNotifications'

export default function useUserInvitations () {
  const result = ref([])
  const loading = ref(false)

  const fetchInvitedUsers = async () => {
    try {
      loading.value = true

      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(getInvitedUsers)
        }
      })

      if (response.data.data.users) {
        result.value = response.data.data.users
      }
    } catch (err) {
      console.log('error while fetching invited users')
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

  return {
    result,
    fetchInvitedUsers,
    inviteUser
  }
}
