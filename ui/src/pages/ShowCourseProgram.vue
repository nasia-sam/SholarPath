<template>
  <q-page padding>
    <div class="q-gutter-md q-pb-sm">
      <div class="text-h4"> {{ course ? course.title : '' }} </div>
      <div class="row justify-between">
        <span class="text-subtitle1 text-grey-8">
          {{ course.department }}, {{ course.university }}
        </span>

        <div>
          <q-fab color="accent" padding="sm" glossy  icon="keyboard_arrow_left" direction="left">
            <q-fab-action
              color="indigo-10"
              text-color="white"
              icon="campaign"
              external-label
              label-position="top"
              label="Create CFS"
              @click="CreateCFSDialogRef.open()"
            />
            <q-fab-action color="indigo-10" text-color="white" icon="alarm" />
          </q-fab>
        </div>

      </div>
      <div class="text-subtitle2 text-grey-8" v-if="course.open">
        Οι αιτήσεις είναι ανοιχτές έως {{ formatDate(course.currentCFS.closeAt) }}
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
    <SubmissionForm :course="course" />
  </q-page>
</template>

<script>
// vue
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

// graphql
import fetchAllProgramCourses from 'src/hooks/CoursePrograms/fetchCoursePrograms'

// Components
import CreateCFSDialog from 'src/components/CreateCFS.vue'
import SubmissionForm from 'src/components/SubmissionForm.vue'

// hooks
import { formatDate } from 'src/hooks/commonFunctions'

export default defineComponent({
  name: 'ShowCourseProgram',
  components: {
    CreateCFSDialog,
    SubmissionForm
  },
  setup () {
    const route = useRoute()

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

    // refs
    const CreateCFSDialogRef = ref(null)

    return {
      course,
      CreateCFSDialogRef,
      formatDate
    }
  }
})

</script>

<style lang="scss" scoped>

</style>
