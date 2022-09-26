import { ref } from 'vue'
import { api } from 'src/boot/axios'

// GQL
import { print } from 'graphql'
import { createCandidate } from 'src/graphql/Candidate/mutations'
import { errorMessage, successMessage } from '../globalNotifications'

export default function useCandidateMutations () {
  const loading = ref(false)

  const useCreateCandidate = async (data) => {
    try {
      loading.value = true

      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(createCandidate),
          variables: {
            data: {
              ...data
            }
          }
        }
      })

      console.log(response.data)

      if (response.data.errors) {
        errorMessage('Error while creating Candidate Submission.')
      } else {
        console.log('in here')
        successMessage('Candidate Submission sucessfully Created')
      }
    } catch (e) {
      console.log('error while updating course program')
    } finally {
      loading.value = false
    }
  }

  return {
    useCreateCandidate,
    loading
  }
}
