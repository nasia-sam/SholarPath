import { ref } from 'vue'
import { api } from 'src/boot/axios'

// gql
import { print } from 'graphql'
import { loginUserMutation } from 'src/graphql/Authentication/mutations'
import { errorMessage } from '../globalNotifications'

export default function useAuthorizationAction () {
  const loading = ref(false)
  const accessToken = ref('')

  const loginUser = async (data) => {
    try {
      loading.value = true

      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(loginUserMutation),
          variables: {
            data
          }
        }
      })

      if (response.data.data) {
        console.log('!!', response.data.data)
      }
    } catch (err) {
      errorMessage('Error while Login User')
    } finally {
      loading.value = false
    }
  }

  return {
    loginUser,
    accessToken
  }
}
