<template>
   <q-dialog v-model="visible" maximized full-height>
     <q-layout view="Lhh lpR fff" container class="bg-white q-pa-md">

       <q-header>
        <q-toolbar>
          <q-toolbar-title>Application for </q-toolbar-title>
        </q-toolbar>
      </q-header>
<!--
      <q-footer class="text-white">
        <q-toolbar class="row justify-end">
          <q-btn flat label="Cancel" />
          <q-btn flat label="Save"/>
        </q-toolbar>
      </q-footer> -->

      <q-page-container>
        <div class="q-pa-md text-grey-8 q-gutter-lg">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
        >
          <span class="text-grey-9 text-subtitle1">Last Name</span>
          <q-input
            filled
            v-model="candidate.surname"
            class="q-pb-lg"
          />

          <span class="text-grey-9 text-subtitle1">First Name</span>
          <q-input
            filled
            v-model="candidate.name"
            class="q-pb-lg"
          />

          <span class="text-grey-9 text-subtitle1">Father's Name</span>
          <q-input
            filled
            v-model="candidate.father_name"
            class="q-pb-lg"
          />

          <span class="text-grey-9 text-subtitle1">Age</span>
          <q-input
            filled
            type="number"
            v-model.number="candidate.age"
            class="q-pb-lg"
          />

          <span class="text-grey-9 text-subtitle1">Address</span>
          <q-input
            filled
            v-model="candidate.address"
            class="q-pb-lg"
          />

          <span class="text-grey-9 text-subtitle1">First Name</span>
          <q-input
            filled
            v-model="candidate.name"
            class="q-pb-lg"
          />

          <span class="text-grey-9 text-subtitle1">First Name</span>
          <q-input
            filled
            v-model="candidate.name"
            class="q-pb-lg"
          />
        </q-form>
        </div>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
// vue
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SubmissionForm',
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  setup () {
    const visible = ref(true)

    const candidate = ref({
      name: '',
      surname: '',
      father_name: '',
      age: null,
      address: '',
      zip_code: '',
      phone_number: '',
      email: '',
      bachelor_degree: '',
      gender: '',
      part_time: false
    })

    return {
      visible,
      candidate
    }
  }
})
</script>
