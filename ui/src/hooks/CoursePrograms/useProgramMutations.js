import { ref } from 'vue'
import { api } from 'src/boot/axios'

// GQL
import { print } from 'graphql'
import { createCourseProgram, updateCourseProgram, deleteCourseProgram } from 'src/graphql/CoursePrograms/mutations'

import { successMessage, errorMessage } from 'src/hooks/globalNotifications'

export default function useProgramMutations () {
  const loading = ref(false)

  const useCreateProgram = async (data, gradeFields) => {
    try {
      loading.value = true

      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(createCourseProgram),
          variables: {
            data,
            gradeFields
          }
        }
      })

      if (response.data.data) {
        successMessage('Course Program succesfully created.')
      } else if (response.data.errors) {
        errorMessage('error while creating Course Program.')
      }
    } catch (e) {
      errorMessage('error while updating course program')
    } finally {
      loading.value = false
    }
  }

  const useUpdateProgram = async (id, data, gradeFields) => {
    try {
      loading.value = true

      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(updateCourseProgram),
          variables: {
            id,
            data: data,
            gradeFields
          }
        }
      })

      if (response.data.data) {
        successMessage('Course Program succesfully updated.')
      } else if (response.data.errors) {
        errorMessage('error while updating Course Program.')
      }
    } catch (e) {
      console.log('error while updating course program')
    } finally {
      loading.value = false
    }
  }

  const useDeleteCourseProgram = async (id) => {
    try {
      const response = await api({
        url: '',
        method: 'POST',
        data: {
          query: print(deleteCourseProgram),
          variables: {
            id
          }
        }
      })

      if (response.data.data) {
        successMessage('Course deleted')
      }
    } catch (e) {
      errorMessage('An error occurred while deleting Course Program')
    }
  }

  return {
    useCreateProgram,
    useUpdateProgram,
    useDeleteCourseProgram
  }
}
