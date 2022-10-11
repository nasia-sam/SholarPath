<template>
   <q-dialog v-model="visible">
     <q-layout view="Lhh lpR fff" container class="bg-white q-pa-md" style="height: 550px">

       <q-header>
        <q-toolbar>
          <q-toolbar-title>Call For Submissions</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-footer class="text-white">
        <q-toolbar class="row justify-end">
          <q-btn flat label="Cancel" @click="cancel"/>
          <q-btn flat label="Save" @click="submit"/>
        </q-toolbar>
      </q-footer>

      <q-page-container>
        <div class="q-pa-md text-grey-8 q-gutter-lg">
          <p class="text-subtitle1">Pick Date Range</p>
          <q-date v-model="openRange" range />

          <!-- <q-select
            filled
            v-model="cfs.documents"
            multiple
            :options="documentsOptions"
            label="Additional files"
          /> -->
          <p class="text-subtitle1">Additional Files</p>
          <div class="q-gutter-y-md">
            <div>
              <q-checkbox v-model="cfs.documents.proofDegree" label="Proof of Degree" />
            </div>
            <div>
              <q-checkbox v-model="cfs.documents.otherMasters" label="Proof of Other Masters" />
            </div>

            <q-checkbox v-model="cfs.documents.references" label="Referencies" />
            <q-input
              type="number"
              v-model.number="cfs.documents.numberOfReferencies"
              class="q-pb-lg q-pl-md"
              :disable="!cfs.documents.references"
              style="max-width: 220px"
              label="Number of References"
            />

        </div>
        </div>
      </q-page-container>

      <q-page-container>
        <q-page padding class="q-gutter-lg q-pa-md">
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'

import usesCfsAction from 'src/hooks/Cfs/useCfsMutations'

export default defineComponent({
  name: 'CreateCFSDialog',
  props: {
    courseProgramId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const visible = ref(false)
    const cfs = ref({
      openFrom: new Date(),
      closeAt: new Date(),
      documents: {
        proofDegree: false,
        otherMasters: false,
        references: false,
        numberOfReferencies: 0
      }
    })

    const openRange = ref({ from: '', to: '' })

    const documentsOptions = ['CV']

    // visible dialog actions
    const open = (payload = false) => {
      if (!payload) {
        cfs.value = {
          openFrom: new Date(),
          closeAt: new Date(),
          documents: {
            proofDegree: false,
            otherMasters: false,
            references: false,
            numberOfReferencies: 0
          }
        }
      }

      openRange.value = { from: '', to: '' }

      visible.value = true
    }

    const cancel = () => {
      visible.value = false
    }

    // create cfs action
    const { createCfsMutation } = usesCfsAction()

    const submit = () => {
      cfs.value.openFrom = openRange.value.from
      cfs.value.closeAt = openRange.value.to

      createCfsMutation({ ...cfs.value, courseProgram: props.courseProgramId })
        .then(() => { visible.value = false })
    }

    return {
      visible,
      cfs,
      openRange,
      documentsOptions,
      open,
      cancel,
      submit
    }
  }
})
</script>
<style>

</style>
