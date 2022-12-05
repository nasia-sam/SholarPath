import { ref } from 'vue'
import { api } from 'src/boot/axios'

// GQL
import { print } from 'graphql'
import { getCandidatesByCfs } from 'src/graphql/Candidate/queries'

export default function fetchAllCandidates () {
  const result = ref([])
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

      if (response.data.data.courses) {
        result.value = response.data.data.courses
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
    loading
  }
}
