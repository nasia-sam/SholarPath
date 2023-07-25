import { ref } from 'vue'
import { api } from 'src/boot/axios'

// GQL
import { print } from 'graphql'
import { createRole } from 'src/graphql/Roles/mutations'
import { errorMessage, successMessage } from '../globalNotifications'

export default function useRoleMutations () {
  const loading = ref(false)

  const useAddRole = async (userId, courseId) => {
    try {
      loading.value = true

      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(createRole),
          variables: {
            userId,
            courseId
          }
        }
      })

      if (response.data.errors) {
        errorMessage('Αποτυχία στην Ανάθεση Ρόλου')
      } else {
        successMessage('Επιτυχης Ανάθεση Ρόλου')
      }
    } catch (e) {
      errorMessage('Αποτυχία στην Ανάθεση Ρόλου')
    } finally {
      loading.value = false
    }
  }

  return {
    useAddRole,
    loading
  }
}
