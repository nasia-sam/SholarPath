import { ref } from 'vue'
import { api } from 'src/boot/axios'

// GQL
import { print } from 'graphql'
import { getReferenceByToken, writeReference } from 'src/graphql/Candidate/references'
import { errorMessage, successMessage } from '../globalNotifications'

export default function useReferences () {
  const reference = ref({
    token: '',
    title: '',
    name: '',
    email: '',
    letter: '',
    candidate: {
      name: '',
      surname: ''
    }
  })

  const getReference = async (token) => {
    try {
      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(getReferenceByToken),
          variables: {
            token
          }
        }
      })

      if (response.data.data) {
        reference.value = response.data.data.reference
      } else if (response.data.errors) {
        errorMessage('Error while fetching Reference.')
      }
    } catch (e) {
      errorMessage('Error while fetching Candidate refence.')
    }
  }

  const useWriteReference = async (data, token) => {
    try {
      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(writeReference),
          variables: {
            data,
            token
          }
        }
      })

      if (response.data.errors) {
        errorMessage('Error while submitting Reference.')
      } else {
        successMessage('Candidate Reference Successfully Submitted.')
      }
    } catch (e) {
      errorMessage('Error while submiting Reference.')
    }
  }

  return {
    reference,

    getReference,
    useWriteReference
  }
}
