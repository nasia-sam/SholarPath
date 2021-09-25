<template>
  <q-page padding>
    <div class="q-gutter-md q-pb-sm">
      <div class="text-h4"> {{ course ? course.title : '' }} </div>
      <div class="row justify-between">
        <span class="text-subtitle1 text-grey-8">
          {{ course.department }}, {{ course.university }}
        </span>
        <div>
          <q-btn dense color="indigo-10" icon="edit" glossy></q-btn>
        </div>

      </div>
    </div>

    <q-card>
      <q-card-section v-html="course.description">

      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-item class="text-blue-10" exact clickable dense tag="a" :href="course.sitelink">
          Visit Website
        </q-item>
      </q-card-actions>
    </q-card>
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
    const course = ref({
      title: '',
      description: '',
      department: '',
      university: '',
      sitelink: ''
    })

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
