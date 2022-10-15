import { ref } from 'vue'
import { api } from 'src/boot/axios'

// GQL
import { print } from 'graphql'
import { createCfs, updateCfs } from 'src/graphql/Cfs/mutations'

import { successMessage, errorMessage } from 'src/hooks/globalNotifications'

export default function usesCfsAction () {
  const loading = ref(false)

  const createCfsMutation = async (payload) => {
    try {
      loading.value = true

      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(createCfs),
          variables: {
            data: payload
          }
        }
      })

      if (response.data.data) {
        successMessage('Call For Submissions succesfully created.')
      } else if (response.data.errors) {
        errorMessage('error while creating Call for Submissions.')
      }
    } catch (e) {
      console.log('error while creating Call for Submissions.')
    } finally {
      loading.value = false
    }
  }

  const updateCfsMutation = async (id, payload) => {
    try {
      loading.value = true

      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(updateCfs),
          variables: {
            id: id,
            data: payload
          }
        }
      })

      if (response.data.data) {
        successMessage('Call For Submissions succesfully updated.')
      } else if (response.data.errors) {
        errorMessage('error while updating Call for Submissions.')
      }
    } catch (e) {
      console.log('error while updating Call for Submissions.')
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    createCfsMutation,
    updateCfsMutation
  }
}
