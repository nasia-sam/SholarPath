import { ref } from 'vue'
import { api } from 'src/boot/axios'

// GQL
import { print } from 'graphql'
import { createCandidate, writeReference } from 'src/graphql/Candidate/mutations'
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
            data
          }
        }
      })

      if (response.data.errors) {
        errorMessage('Error while creating Candidate Submission.')
      } else {
        console.log('in here')
        successMessage('Candidate Submission sucessfully Created')
      }
    } catch (e) {
      errorMessage('Error while creating Candidate Submission.')
    } finally {
      loading.value = false
    }
  }

  const useWriteReference = async (data) => {
    try {
      loading.value = true

      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(writeReference),
          variables: {
            data
          }
        }
      })

      if (response.data.errors) {
        errorMessage('Error while submitting Reference.')
      } else {
        console.log('in here')
        successMessage('Candidate Reference Successfully Submitted.')
      }
    } catch (e) {
      errorMessage('Error while submiting Reference.')
    } finally {
      loading.value = false
    }
  }

  return {
    useCreateCandidate,
    useWriteReference,
    loading
  }
}
