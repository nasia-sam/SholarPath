<template>
  <q-page padding>
    <div class="row justify-between q-mb-lg">
      <span class="text-h3"> {{ course ? course.title : '' }} </span>
      <div>
        <q-btn
          color="indigo-10"
          glossy
          icon="add"
        />
      </div>
    </div>

    <q-page-container>
      {{ course }}
    </q-page-container>
  </q-page>
</template>

<script>
// vue
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

// graphql
import fetchAllProgramCourses from 'src/hooks/CoursePrograms/fetchCoursePrograms'

export default defineComponent({
  name: 'ShowCourseProgram',
  setup () {
    const route = useRoute()

    const slug = ref('')
    const course = ref(null)

    const { fetchBySlug } = fetchAllProgramCourses()

    onMounted(() => {
      slug.value = route.params.slug
      fetchBySlug(slug.value).then(res => { course.value = res })
    })

    return {
      course
    }
  }
})

</script>

<style lang="scss" scoped>

</style>
