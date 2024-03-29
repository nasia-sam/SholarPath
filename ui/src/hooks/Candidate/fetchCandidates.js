import { ref } from 'vue'
import { api } from 'src/boot/axios'

// GQL
import { print } from 'graphql'
import { getCandidatesByCfs, getCandidateById } from 'src/graphql/Candidate/queries'

export default function fetchAllCandidates () {
  const result = ref([])
  const candidate = ref()
  const loading = ref(false)

  const fetch = async (cfsId) => {
    try {
      loading.value = true

      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(getCandidatesByCfs),
          variables: {
            id: cfsId
          }
        }
      })

      if (response.data.data.candidates) {
        return response.data.data.candidates
      }
    } catch (err) {
      console.log('error while fetching course candidates')
    } finally {
      loading.value = false
    }
  }

  const fetchById = async (id) => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(getCandidateById),
          variables: {
            id: id
          }
        }
      })
      console.log('ress', response.data.data.candidate)
      if (response.data) {
        candidate.value = response.data.data.candidate
      }
    } catch (err) {
      console.log('error while fetching course candidates')
    } finally {
      loading.value = false
    }
  }

  return {
    result,
    fetch,
    fetchById,
    candidate,
    loading
  }
}
