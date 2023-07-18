<template>
  <q-dialog v-model="visible">
    <q-layout view="Lhh lpR fff" container class="bg-white q-pa-md" style="height: 550px">

      <q-header>
       <q-toolbar>
         <q-toolbar-title>Αποδοχή Αιτήσεων</q-toolbar-title>
       </q-toolbar>
     </q-header>

     <q-footer class="text-white">
       <q-toolbar class="row justify-end">
         <q-btn flat label="Cancel"/>
         <q-btn flat label="Save" @click="submit"/>
       </q-toolbar>
     </q-footer>

     <q-page-container>
      <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="col-2 flex flex-center">
          <q-avatar color="red" text-color="white" icon="warning" />
        </q-card-section>
        <q-card-section class="q-pt-xs flex flex-center">
          <div class="text-caption text-grey-8">
            Με αυτή την ενέργεια, όλοι οι υποψήφιοι θα παραλάβουν email είτε αποδοχής στο ΠΜΣ είτε ότι μπήκαν στην λίστα αναμονής.
            Η ενέργεια δεν είναι αναστρέψιμη και μπορεί να διαρκέσει λίγα λεπτά.
          </div>
        </q-card-section>

      </q-card-section>

      <q-separator />

    </q-card>
       <div class="q-pa-md text-grey-9 ">
        <div class="q-py-md">
        <!-- Πλήθος Θετικών Αιτήσεων -->
        <q-input
          type="number"
          v-model.number="data.capacity"
          class="q-pb-sm"
          label="Θετικές Αιτήσεις"
        />
        <p class="text-caption">Το νούμερο των αιτήσεων που θα πάρουν θετική απάντηση (κατανεμημένα βάσει τελικής βαθμολογίας)</p>

      </div>
        <!-- Διορία Αποδοχής -->
        <div class="q-py-md">
         <div class="text-subtitle1">Διορία Αποδοχής Εισαγωγής</div>
         <div class="text-caption q-pb-sm">Η ημερομηνία έως την οποία μπορούν οι υποψήφιοι να στείλουν τα χαρτιά τους</div>
         <q-date v-model="data.deadline" />
        </div>

        <!-- Διορία Λίστας Αναμονής -->
        <div class="q-py-md">
        <div class="text-subtitle1">Διορία Αποδοχής Λίστας Αναμονής</div>
        <div class="text-caption q-pb-sm">Η ημερομηνία μέχρι την οποία θα έχουν ενημερωθεί τα άτομα από Λίστα Αναμονής</div>
        <q-date v-model="data.waitlistDeadline" />
      </div>
        </div>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'AcceptCandidates',
  props: {
    cfsId: {
      type: String,
      required: true
    }
  },
  setup (props, { emit }) {
    const visible = ref(false)

    const open = () => {
      visible.value = true
    }

    const data = ref({
      capacity: null,
      deadline: null,
      waitlistDeadline: null
    })

    const submit = () => {
      emit('acceptAction', { ...data.value, cfsId: props.cfsId })
      visible.value = false
    }

    return {
      visible,
      data,
      open,
      submit
    }
  }
})
</script>
