<template>
  <q-page padding>
    <div class="q-gutter-md q-pb-sm">
      <div class="text-h4"> {{ course ? course.title : '' }} </div>
      <div class="row justify-between">
        <span class="text-subtitle1 text-grey-8">
          {{ course.department }}, {{ course.university }}
        </span>

        <div v-if="isAuthenticated">
          <q-fab color="accent" padding="sm" glossy  icon="keyboard_arrow_left" direction="left">
            <q-fab-action
              v-if="!course.open"
              color="indigo-10"
              text-color="white"
              icon="campaign"
              label-position="top"
              :label="course.currentCFS?.state === 'published' ? 'Edit CFS' : 'Create CFS'"
              @click="CreateCFSDialogRef.open(course.currentCFS ?? undefined)"
            />
            <q-fab-action
              v-if="course.open"
              color="indigo-10"
              text-color="white"
              icon="campaign"
              label-position="top"
              label="Extend Deadline"
              @click="ExtendCFSDialogRef.open(course.currentCFS)"
            />
            <q-fab-action
              color="indigo-10"
              text-color="white"
              icon="people"
              label-position="top"
              label="Show Candidates"
              @click="redirectCandidatesPage"
            />
          </q-fab>
        </div>

      </div>
      <div class="text-subtitle2 text-grey-8" v-if="course.open">
        <div class="row justify-between">
            Οι αιτήσεις είναι ανοιχτές έως {{ formatDate(course.currentCFS.closeAt) }}
          <div>
            <q-btn color="primary" class="q-px-xl q-py-xs" @click="CreateCandidateRef.open()">Αίτηση</q-btn  >
          </div>
        </div>
      </div>
      <div class="text-subtitle2 text-grey-8" v-else-if="course.currentCFS?.state === 'published'">
        Οι αιτήσεις ανοίγουν στις {{ formatDate(course.currentCFS.openFrom) }}
      </div>
    </div>

    <q-card>
      <q-card-section v-html="course.description">
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-item class="text-blue-10"  clickable dense tag="a" :href="course.sitelink">
          Visit Website
        </q-item>
      </q-card-actions>
    </q-card>

    <CreateCFSDialog ref="CreateCFSDialogRef" :courseProgramId="course.id" />
    <ExtendCFSDialog ref="ExtendCFSDialogRef" />
    <SubmissionForm :course="course" ref="CreateCandidateRef" />
  </q-page>
</template>

<script>
// vue
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

// graphql
import fetchAllProgramCourses from 'src/hooks/CoursePrograms/fetchCoursePrograms'

// stores
import useloggedUser from 'src/store/auth'

// Components
import CreateCFSDialog from 'src/components/CreateCFS.vue'
import ExtendCFSDialog from 'src/components/ExtendCfsDialog.vue'
import SubmissionForm from 'src/components/SubmissionForm.vue'

// hooks
import { formatDate } from 'src/hooks/commonFunctions'

export default defineComponent({
  name: 'ShowCourseProgram',
  components: {
    CreateCFSDialog,
    ExtendCFSDialog,
    SubmissionForm
  },
  setup () {
    const route = useRoute()
    const router = useRouter()

    const slug = ref('')
    const course = ref({
      id: '',
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

    const redirectCandidatesPage = () => {
      router.push(`/courses/${slug.value}/candidates`)
    }

    const userStore = useloggedUser()
    const { isAuthenticated } = storeToRefs(userStore)

    // refs
    const CreateCFSDialogRef = ref(null)
    const ExtendCFSDialogRef = ref(null)
    const CreateCandidateRef = ref(null)

    return {
      course,
      formatDate,

      redirectCandidatesPage,
      isAuthenticated,

      CreateCFSDialogRef,
      ExtendCFSDialogRef,
      CreateCandidateRef
    }
  }
})

</script>

<style lang="scss" scoped>

</style>
