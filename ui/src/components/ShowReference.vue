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
          </q-page>
        </q-page-container>
      </q-layout>
  </q-dialog>

</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>
<style>

</style>
