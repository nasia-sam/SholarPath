<template>
  <q-page padding>
    <h3>Courses</h3>
    <q-table
      title="Treats"
      :rows="result"
      :columns="columns"
      :loading="loading"
      row-key="name"
    />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

import fetchAllProgramCourses from 'src/hooks/CoursePrograms/fetchCoursePrograms'

export default defineComponent({
  name: 'CoursePrograms',

  setup () {
    const columns = [
      { name: 'title', align: 'center', label: 'Title', field: 'title', sortable: true },
      { name: 'slug', align: 'center', label: 'Slug', field: 'slug', sortable: true },
      { name: 'university', align: 'center', label: 'University', field: 'university', sortable: true },
      { name: 'sitelink', align: 'center', label: 'link', field: 'sitelink', sortable: true }
    ]

    // get data from server
    const { result, loading } = fetchAllProgramCourses()

    return {
      result,
      loading,
      columns
    }
  }
})
</script>

<style>

</style>
