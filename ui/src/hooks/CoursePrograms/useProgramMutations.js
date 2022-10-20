import { ref } from 'vue'
import { api } from 'src/boot/axios'

// GQL
import { print } from 'graphql'
import { createCourseProgram } from 'src/graphql/CoursePrograms/mutations'

export default function useProgramMutations () {
  const loading = ref(false)

  const useCreateProgram = async (data, gradeFields) => {
    try {
      loading.value = true

      await api({
        url: '',
        method: 'POST',
        data: {
          query: print(createCourseProgram),
          variables: {
            data: {
              ...data,
              adminId: '1234'
            },
            gradeFields
          }
        }
      })
    } catch (e) {
      console.log('error while updating course program')
    } finally {
      loading.value = false
    }
  }

  return {
    useCreateProgram
  }
}
