<template>
  <q-page padding>
    <div class="row justify-between q-mb-lg">
      <span class="text-h4"> Προγράματα Σπουδών </span>
      <div>
        <q-btn
          v-if="isAdmin"
          color="indigo-10"
          glossy
          icon="add"
          @click="CreateProgramCourseDialogRef.open()"
        />
      </div>
    </div>

    <q-table
      grid
      :rows="result"
      :columns="columns"
      :loading="loading"
      row-key="name"
    >

      <template v-slot:item="props">
        <div class="q-pa-xs col-12 cursor-pointer" @click="redirectToPage(props.row.slug)">
          <q-card>
            <q-card-section class="text-center">
              <div class="row items-center no-wrap">
                <div class="col text-h6">{{ props.row.title }}</div>
                <div class="col-auto" v-if="createdByLogged(props.row.admin) ">
                  <q-btn color="grey-7" round size="sm" flat icon="edit" @click.stop="CreateProgramCourseDialogRef.open(props.row)" />
                </div>
              </div>
              <div class="row items-center no-wrap">
                <div class="col text-subtitle2 text-grey-9">{{ props.row.university }}</div>
                <div class="col-auto" v-if="createdByLogged(props.row.admin) && !props.row.open">
                  <q-btn color="grey-7" round size="sm" flat icon="delete" @click.stop="confirmDelete(props.row.id)" />
                </div>
              </div>

            </q-card-section>
          </q-card>
        </div>
      </template>

    </q-table>
  </q-page>

  <CreateProgramCourseDialog ref="CreateProgramCourseDialogRef" @refetch="fetchPrograms" />
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'

// gql
import fetchAllProgramCourses from 'src/hooks/CoursePrograms/fetchCoursePrograms'
import useProgramMutations from 'src/hooks/CoursePrograms/useProgramMutations'

// components
import CreateProgramCourseDialog from 'src/components/CreateProgramDialog.vue'

// stores
import useloggedUser from 'src/store/auth'

export default defineComponent({
  name: 'CoursePrograms',
  components: {
    CreateProgramCourseDialog
  },
  setup () {
    const router = useRouter()
    const $q = useQuasar()

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

    // user store
    const userStore = useloggedUser()
    const { createdByLogged, isAdmin } = storeToRefs(userStore)

    // delete CP action
    const { useDeleteCourseProgram } = useProgramMutations()

    const confirmDelete = (id) => {
      $q.dialog({
        title: 'Διαγραφή Προγράμματος Σπουδών',
        message: 'Είστε σίγουροι;\n Θα διαγραφούν για πάντα όλα τα δεδομένα που υπάρχουν για αυτό το Πρόγραμμα Σοουδών',
        cancel: true,
        persistent: true
      }).onOk(() => {
        useDeleteCourseProgram(id)
      })
    }

    // referencies
    const CreateProgramCourseDialogRef = ref(null)

    return {
      result,
      loading,
      columns,
      createdByLogged,
      isAdmin,
      fetchPrograms,
      redirectToPage,
      confirmDelete,
      CreateProgramCourseDialogRef
    }
  }
})
</script>

<style>

</style>
