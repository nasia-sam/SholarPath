<template>
   <q-dialog v-model="visible">
     <q-layout view="Lhh lpR fff" container class="bg-white q-pa-md" style="height: 550px">

       <q-header>
        <q-toolbar>
          <q-toolbar-title>Create Course Program</q-toolbar-title>
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
            label="Title"
            v-model="course.title"
          />

          <q-input
            filled
            label="Slug"
            v-model="course.slug"
            prefix="/"
            hint="Slug must be unique"
          />

          <q-input
            filled
            label="University"
            v-model="course.university"
          />

          <q-input
            filled
            label="Department"
            v-model="course.department"
          />

          <q-input
            filled
            label="Description"
            v-model="course.description"
            autogrow
            hint="A short description for this course program."
          />

          <q-input
            filled
            label="Link to site"
            v-model="course.sitelink"
          />
        </q-page>
      </q-page-container>

     </q-layout>
   </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'

import useProgramMutations from 'src/hooks/CoursePrograms/useProgramMutations'

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

export default defineComponent({
  name: 'CreateProgramCourseDialog',
  setup (_, { emit }) {
    const course = ref(clone(emptyCourse))

    const { useCreateProgram } = useProgramMutations()

    // open - close dialog
    const visible = ref(false)

    const open = () => {
      visible.value = true
    }

    const cancel = () => {
      visible.value = false
      course.value = emptyCourse
    }

    const submit = () => {
      useCreateProgram(course.value)
        .then(() => {
          emit('refetch')
          cancel()
        })
    }

    return {
      visible,
      cancel,
      submit,
      open,
      course,
      useCreateProgram
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
