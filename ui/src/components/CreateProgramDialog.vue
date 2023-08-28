<template>
   <q-dialog v-model="visible">
     <q-layout view="Lhh lpR fff" container class="bg-white q-pa-md" style=" height: 95%;">

       <q-header>
        <q-toolbar>
          <q-toolbar-title>Πρόγραμμα Σπουδών</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-footer class="text-white">
        <q-toolbar class="row justify-end">
          <q-btn flat label="Cancel" @click="cancel"/>
          <q-btn flat label="Save" @click="submit"/>
        </q-toolbar>
      </q-footer>

      <q-page-container>
        <q-page padding class="q-gutter-lg q-pa-md">
          <q-input
            filled
            autofocus
            label="Τίτλος"
            v-model="course.title"
          />

          <q-input
            filled
            label="Slug"
            v-model="course.slug"
            prefix="/"
            hint="Πρέπει να είναι μοναδικό για κάθε Πρόγραμμα Σπουδών"
          />

          <q-input
            filled
            label="Πανεπιστήμιο"
            v-model="course.university"
          />

          <q-input
            filled
            label="Τμήμα"
            v-model="course.department"
          />

          <q-input
            filled
            label="Περγραφή"
            v-model="course.description"
            autogrow
            hint="Σύντομη πρεριγραφή του Προγραμματος Σπουδών"
          />

          <q-input
            filled
            label="Link του site"
            v-model="course.sitelink"
          />

          <hr style="color:#ebebe0;background-color:#ebebe0" />
          <span class="text-grey-9 text-subtitle1">Πεδία Αξιολόγησης</span>

          <AddGradeField v-model="gradeFields" />

          <q-list bordered separator class="rounded-borders" >
            <q-item v-for="(field, index) in gradeFields" :key="field.key">
              <q-item-section >
                <q-item-label class="q-mt-sm text-weight-bold">{{ field.title }}</q-item-label>
              </q-item-section>

              <q-item-section >
                <q-item-label class="q-mt-sm"><span class="text-grey-8 text-caption">Values: </span>{{ field.min_val }} - {{ field.max_val }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="removeFields(index)" />
                </div>
              </q-item-section>
            </q-item>
          </q-list>

        </q-page>
      </q-page-container>

     </q-layout>
   </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'

import useProgramMutations from 'src/hooks/CoursePrograms/useProgramMutations'

import AddGradeField from 'src/components/content/AddGradeField.vue'

// libraries
import { clone } from 'ramda'

const emptyCourse = {
  slug: '',
  university: '',
  department: '',
  title: '',
  description: '',
  sitelink: ''
}

const newField = ref({
  key: '',
  title: '',
  miv_val: 0,
  max_val: 0
})

export default defineComponent({
  name: 'CreateProgramCourseDialog',
  components: {
    AddGradeField
  },
  setup (_, { emit }) {
    const course = ref(clone(emptyCourse))

    const { useCreateProgram, useUpdateProgram } = useProgramMutations()

    // open - close dialog
    const visible = ref(false)

    const gradeFields = ref([])

    const removeFields = (index) => {
      gradeFields.value.splice(index, 1)
    }

    const id = ref()

    const open = (payload = false) => {
      if (payload) {
        course.value = {
          slug: payload.slug,
          university: payload.university,
          department: payload.department,
          title: payload.title,
          description: payload.description,
          sitelink: payload.sitelink
        }

        gradeFields.value = payload.gradeFields ?? []
        id.value = payload.id
      }

      visible.value = true
    }

    const cancel = () => {
      visible.value = false
      course.value = clone(emptyCourse)
      id.value = ''
      gradeFields.value = []
    }

    const submit = () => {
      if (!id.value) {
        useCreateProgram(course.value, gradeFields.value)
          .then(() => {
            emit('refetch')
            cancel()
          })
      } else {
        useUpdateProgram(id.value, course.value, gradeFields.value)
          .then(() => {
            emit('refetch')
            cancel()
          })
      }
    }

    return {
      visible,
      cancel,
      submit,
      open,

      course,
      gradeFields,
      newField,
      removeFields,

      useCreateProgram
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
