<template>
  <q-dialog v-model="visible">
     <q-layout view="Lhh lpR fff" container class="bg-white q-pa-md" style=" height: 95%;">

        <q-header>
          <q-toolbar>
            <q-toolbar-title>Συστατική Ειστολή</q-toolbar-title>
            <q-btn icon="close" flat round dense v-close-popup />
          </q-toolbar>
        </q-header>

        <q-page-container>
          <q-page padding>
            Όνομα: <span class="text-grey-9 text-bold text-subtitle1">{{ reference.name }}</span>
            <div class="text-body-1 q-pa-md">
              {{  reference.letter }}
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
  </q-dialog>

</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ShowReference',
  setup () {
    const visible = ref(false)
    const reference = ref()

    const open = (payload) => {
      reference.value = payload
      visible.value = true
    }

    return {
      visible,
      reference,
      open
    }
  }
})
</script>
<style>

</style>
