import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'

// GQL
import { print } from 'graphql'
import { getAllCoursesQuery, getCourseProgramBySlug } from 'src/graphql/CoursePrograms/queries'

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

  // todo move it to other file lol
  const fetchBySlug = async (slug) => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(getCourseProgramBySlug),
          variables: {
            slug: slug
          }
        }
      })

      if (response.data.data) {
        return response.data.data.course
      }
    } catch (err) {
      console.log('Error while fetching course program.')
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
    fetchBySlug,
    loading
  }
}
