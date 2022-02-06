<template>
  <q-page padding>
    <div class="row justify-between q-mb-lg">
      <span class="text-h4"> Courses </span>
      <div>
        <q-btn
          color="indigo-10"
          glossy
          icon="add"
          @click="CreateProgramCourseDialogRef.open()"
        />
      </div>
    </div>

    <q-table
      :rows="result"
      :columns="columns"
      :loading="loading"
      row-key="name"
    >
      <template v-slot:body-cell="props">
        <q-td
          :props="props"
          class="cursor-pointer"
          @click="redirectToPage(props.row.slug)"
        >
          {{ props.value }}
        </q-td>
      </template>

    </q-table>
  </q-page>

  <CreateProgramCourseDialog ref="CreateProgramCourseDialogRef" @refetch="fetchPrograms" />
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

// gql
import fetchAllProgramCourses from 'src/hooks/CoursePrograms/fetchCoursePrograms'

// components
import CreateProgramCourseDialog from 'src/components/CreateProgramDialog.vue'

export default defineComponent({
  name: 'CoursePrograms',
  components: {
    CreateProgramCourseDialog
  },
  setup () {
    const router = useRouter()

    const columns = [
      { name: 'title', align: 'center', label: 'Title', field: 'title', sortable: true },
      { name: 'slug', align: 'center', label: 'Slug', field: 'slug', sortable: true },
      { name: 'university', align: 'center', label: 'University', field: 'university', sortable: true },
      { name: 'sitelink', align: 'center', label: 'link', field: 'sitelink', sortable: true },
      { name: 'open', align: 'center', label: 'Open Submissions', field: 'open', sortable: true }
    ]

    // get data from server
    const { result, loading, fetch: fetchPrograms } = fetchAllProgramCourses()

    // redirect to course page
    const redirectToPage = (slug) => {
      router.push(`/courses/${slug}`)
    }

    // referencies
    const CreateProgramCourseDialogRef = ref(null)

    return {
      result,
      loading,
      columns,
      fetchPrograms,
      redirectToPage,
      CreateProgramCourseDialogRef
    }
  }
})
</script>

<style>

</style>
