import { ref } from 'vue'
import { api } from 'src/boot/axios'

// GQL
import { print } from 'graphql'
import { createRole, removeRole } from 'src/graphql/Roles/mutations'
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
        return false
      } else {
        successMessage('Επιτυχης Ανάθεση Ρόλου')
        return true
      }
    } catch (e) {
      errorMessage('Αποτυχία στην Ανάθεση Ρόλου')
    } finally {
      loading.value = false
    }
  }

  const useRemoveRole = async (id) => {
    try {
      loading.value = true

      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(removeRole),
          variables: {
            id
          }
        }
      })

      if (response.data.errors) {
        errorMessage('Αποτυχία στην Διαγραφή Ρόλου')
        return false
      } else {
        successMessage('Επιτυχης Διαγραφή Ρόλου')
        return true
      }
    } catch (e) {
      errorMessage('Αποτυχία στην Διαγραφή Ρόλου')
    } finally {
      loading.value = false
    }
  }

  return {
    useAddRole,
    useRemoveRole,
    loading
  }
}
