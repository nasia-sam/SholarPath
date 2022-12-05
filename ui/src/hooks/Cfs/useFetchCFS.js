import { ref } from 'vue'
import { api } from 'src/boot/axios'

// GQL
import { print } from 'graphql'
import { getCFSByCourse } from 'src/graphql/Cfs/queries'

export default function useFetchCFS () {
  const result = ref([])
  const loading = ref(false)

  const fetchCFSbyCourse = async (slug) => {
    try {
      loading.value = true

      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(getCFSByCourse),
          variables: {
            slug: slug
          }
        }
      })

      if (response.data.data.cfs) {
        result.value = response.data.data.cfs
      }
    } catch (err) {
      console.log('error while fetching course programs')
    } finally {
      loading.value = false
    }
  }

  return {
    result,
    fetchCFSbyCourse,
    loading
  }
}
