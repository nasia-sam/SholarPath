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

          <!-- <span class="text-grey-9 text-subtitle1">Απόδειξη Πτυχίου</span> -->
          <q-file
            v-if="course.currentCFS.documents.proofDegree"
            color="dark"
            filled
            clearable
            v-model="candidate.proofDegree"
            label="Απόδειξη Πτυχίου"
            accept=".pdf"
            :rules="[isRequired]"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>

          <!-- <span class="text-grey-9 text-subtitle1">Άλλα Μεταπτυχιακά</span> -->
          <q-file
            v-if="course.currentCFS.documents.otherMasters"
            color="dark"
            filled
            clearable
            multiple
            v-model="masterFiles"
            label="Άλλα Μεταπτυχιακά"
            accept=".pdf"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>

          <q-checkbox size="lg" class="q-py-md" v-model="candidate.part_time" label="Ενδιαφέρομαι για Part time" />

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
    const visible = ref(false)

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
      course_id: props.course.id,
      cfs: props.course?.currentCFS?.id || '',
      proofDegree: null,
      otherMasters: [],
      referenceInfo: []
    })

    // options
    const genderOptions = [
      { label: 'Άνδρας', value: 'male' },
      { label: 'Γυναίκα', value: 'female' },
      { label: 'Άλλο', value: 'other' }
    ]

    // convert pdf
    const fileCv = ref()
    const masterFiles = ref()

    const convertFileToBase64 = async (file) =>
      await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
      })

    const setPDF = async () => {
      if (fileCv.value !== null) {
        candidate.value.cv = await convertFileToBase64(fileCv.value)
      } else {
        candidate.value.cv = ''
      }

      if (candidate.value.proofDegree !== null) {
        candidate.value.proofDegree = await convertFileToBase64(candidate.value.proofDegree)
      }

      if (masterFiles.value.length > 0) {
        candidate.value = masterFiles.value.map(async (master) => {
          const enc = await convertFileToBase64(master)
          console.log('ti gurnaei!!')
          return enc
        })
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
    const onSubmit = async () => {
      validate()
      await setPDF()
      finalSubmit()
    }

    const finalSubmit = () => {
      console.log('candidate data', candidate.value)
    }

    const onCancel = () => {
      visible.value = false
      useCreateCandidate({ ...candidate.value, cfs: props.course.currentCFS.id })
      // .then(onCancel())
    }

    const open = () => {
      visible.value = true
      candidate.value.cfs = props.course.currentCFS.id
    }

    return {
      myForm,
      visible,
      candidate,
      genderOptions,
      fileCv,
      masterFiles,

      isRequired,
      isValidEmai,

      onSubmit,
      onCancel,
      open
    }
  }
})
</script>
