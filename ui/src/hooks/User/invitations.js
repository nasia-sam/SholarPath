import { ref } from 'vue'
import { api } from 'src/boot/axios'

// GQL
import { print } from 'graphql'
import { getInvitedUsers, getPendingInvitations } from 'src/graphql/Users/queries'
import { inviteUserMutation } from 'src/graphql/Authentication/mutations'
import { errorMessage, successMessage } from '../globalNotifications'
import { addAdmin } from 'src/graphql/Users/mutations'

export default function useUserInvitations () {
  const result = ref([])
  const loading = ref(false)
  const pendingInvitations = ref([])

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

      if (response.data.data.inviteUser) {
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

  const fetchPendingInvitations = async () => {
    try {
      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(getPendingInvitations)
        }
      })
      if (response.data.data.invitations) {
        pendingInvitations.value = response.data.data.invitations
      } else {
        errorMessage('Error while fetching Pending Invitation')
      }
    } catch (err) {
      errorMessage('Error while fetching Pending Invitation')
    }
  }

  const useAddAdminRole = async (id) => {
    try {
      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(addAdmin),
          variables: {
            id
          }
        }
      })

      if (response.data.data.giveAdminRights) {
        successMessage('Επιτυχής ανάθεση Administrator δικαιωμάτων')
        return response.data.data.giveAdminRights
      }
    } catch (err) {
      errorMessage('Σφάλμα στην ανάθεση ρόλου')
    }
  }

  return {
    result,
    pendingInvitations,
    fetchInvitedUsers,
    inviteUser,
    fetchPendingInvitations,
    useAddAdminRole
  }
}
