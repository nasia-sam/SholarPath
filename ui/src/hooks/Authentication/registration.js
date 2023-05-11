import { ref } from 'vue'
import { api } from 'src/boot/axios'

// gql
import { print } from 'graphql'
import { getInvitationByToken } from 'src/graphql/Authentication/queries'
import { errorMessage } from '../globalNotifications'

export default function useRegistrationActions () {
  const result = ref([])
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
            token
          }
        }
      })

      if (response.data.data.invitation) {
        result.value = response.data.data.invitation
      } else {
        errorMessage('Error while Fetching Invitation')
      }
    } catch (err) {
      console.log('Error while Fetching Invitation')
    } finally {
      loading.value = false
    }
  }

  return {
    fetchInvitation
  }
}
