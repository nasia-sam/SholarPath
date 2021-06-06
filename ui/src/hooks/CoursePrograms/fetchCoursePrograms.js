import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'

// GQL
import { print } from 'graphql'
import { getAllCoursesQuery } from 'src/graphql/CoursePrograms.js/queries'

export default function fetchAllProgramCourses () {
  const result = ref([])
  const loading = ref(false)

  const fetch = async () => {
    try {
      loading.value = true

      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(getAllCoursesQuery)
        }
      })

      if (response.data.data.courses) {
        result.value = response.data.data.courses
      }
    } catch (err) {
      console.log('error while fetching course programs')
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetch()
  })

  return {
    result,
    fetch,
    loading
  }
}
