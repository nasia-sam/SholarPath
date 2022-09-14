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
          @reset="onCancel"
          ref="myForm"
        >
          <span class="text-grey-9 text-subtitle1">Επίθετο</span>
          <q-input
            filled
            v-model="candidate.surname"
            class="q-pb-lg"
            :rules="[isRequired]"
          />

          <span class="text-grey-9 text-subtitle1">Όνομα</span>
          <q-input
            filled
            v-model="candidate.name"
            class="q-pb-lg"
            :rules="[isRequired]"
          />

          <span class="text-grey-9 text-subtitle1">Email</span>
          <q-input
            v-model="candidate.email"
            filled
            type="email"
            :rules="[isRequired, isValidEmai]"
          />

          <span class="text-grey-9 text-subtitle1">Όνομα Πατρός</span>
          <q-input
            filled
            v-model="candidate.father_name"
            class="q-pb-lg"
            :rules="[isRequired]"
          />

          <span class="text-grey-9 text-subtitle1">Ηλικία</span>
          <q-input
            filled
            type="number"
            v-model.number="candidate.age"
            class="q-pb-lg"
            :rules="[isRequired]"
          />

          <div class="row q-gutter-md">
            <div class="col">
              <span class="text-grey-9 text-subtitle1">Οδός Κατοικίας</span>
              <q-input
                filled
                v-model="candidate.address"
                class="q-pb-lg"
                :rules="[isRequired]"
              />
            </div>

            <div     class="col">
              <span class="text-grey-9 text-subtitle1">Ταχυδρομικός Κώδικας</span>
              <q-input
                filled
                v-model="candidate.zip_code"
                class="q-pb-lg"
                :rules="[isRequired]"
              />

            </div>
          </div>

          <div>
            <span class="text-grey-9 text-subtitle1 q-py-md">Φύλο</span>
            <q-option-group
              v-model="candidate.gender"
              :options="genderOptions"
              color="primary"
              inline
            />
          </div>

          <span class="text-grey-9 text-subtitle1">Νούμερο Τηλεφώνου</span>
          <q-input
            filled
            v-model="candidate.phone_number"
            class="q-pb-lg"
            type="tel"
            :rules="[isRequired]"
          />

          <hr style="color:#ebebe0;background-color:#ebebe0" />

          <span class="text-grey-9 text-subtitle1">Προπτυχιακός Τίτλος</span>
          <q-input
            filled
            v-model="candidate.bachelor_degree"
            class="q-pb-lg"
            :rules="[isRequired]"
          />

          <span class="text-grey-9 text-subtitle1">Βιογραφικό</span>
          <q-file
            color="dark"
            filled
            clearable
            v-model="fileCv"
            label="CV"
            accept=".pdf"
            :rules="[isRequired]"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>

          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Cancel" type="reset" color="primary" flat class="q-ml-sm" />
          </div>

        </q-form>
        </div>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
// vue
import { defineComponent, ref } from 'vue'

// common
import { isRequired, isValidEmai } from 'src/hooks/rules'
import { errorMessage } from 'src/hooks/globalNotifications'

// actions
import useCandidateMutations from 'src/hooks/Candidate/useCandidateActions'

export default defineComponent({
  name: 'SubmissionForm',
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  setup (props) {
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
      part_time: false,
      cv: '',
      course_id: props.course.id
    })

    // options
    const genderOptions = [
      { label: 'Άνδρας', value: 'male' },
      { label: 'Γυναίκα', value: 'female' },
      { label: 'Άλλο', value: 'other' }
    ]

    // convert pdf
    const fileCv = ref()

    const convertFileToBase64 = () =>
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(fileCv.value)

        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
      })

    const setPDF = () => {
      if (fileCv.value !== null) {
        convertFileToBase64()
          .then((enc) => {
            candidate.value.cv = enc
            finalSubmit()
          })
          .catch(err => console.log(err))
      } else {
        candidate.value.cv = ''
        finalSubmit()
      }
    }

    // form validation
    const myForm = ref(null)

    function validate () {
      myForm.value.validate().then(success => {
        if (success) {
          console.log('succ')
        // yay, models are correct
        } else {
          errorMessage('Συμπληρώστε όλα τα απαραίτητα πεδία.')
        }
      })
    }

    // create hook
    const { useCreateCandidate } = useCandidateMutations()

    // actions
    const onSubmit = () => {
      validate()
      setPDF()
      console.log()
    }

    const finalSubmit = () => {
      useCreateCandidate(candidate.value)
        .then(onCancel())
    }

    const onCancel = () => {
      visible.value = false
    }

    return {
      myForm,
      visible,
      candidate,
      genderOptions,
      fileCv,

      isRequired,
      isValidEmai,

      onSubmit,
      onCancel
    }
  }
})
</script>
