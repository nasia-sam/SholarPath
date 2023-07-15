import { ref } from 'vue'
import { api } from 'src/boot/axios'

// GQL
import { print } from 'graphql'
import { createCandidate, gradeCandidate } from 'src/graphql/Candidate/mutations'
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
        return undefined
      } else {
        return response.data.data.createCandidate
      }
    } catch (e) {
      errorMessage('Error while creating Candidate Submission.')
    } finally {
      loading.value = false
    }
  }

  const gradeCandidateMutation = async (id, review) => {
    try {
      loading.value = true

      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(gradeCandidate),
          variables: {
            data: {
              candidate: id,
              review: review
            }
          }
        }
      })

      if (response.data.errors) {
        errorMessage('Error while grading Candidate Submission.')
        return undefined
      } else {
        successMessage('Candidate Review sucessfully Created')
        return response.data.data.gradeCandidate
      }
    } catch (e) {
      errorMessage('Error while grading Candidate Submission.')
    } finally {
      loading.value = false
    }
  }

  return {
    useCreateCandidate,
    gradeCandidateMutation,

    loading
  }
}
