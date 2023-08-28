<template>
  <q-card flat bordered class=" width-full q-pa-md">
    <q-card-section horizontal class="q-gutter-x-sm justify-between">
      <q-input
        square
        dense
        v-model="newField.title"
        style="width:100%"
        label="Τίτλος"
        filled
        hint="Πρέπει να είναι ξεχωριστός σε κάθε Πρόγραμμα Σπουδών (case insesitive)."
      />

  </q-card-section>

  <q-card-section horizontal class="q-gutter-x-sm q-pt-md justify-between">
    <q-input
      square
      dense
      v-model.number="newField.min_val"
      label="Min Τιμή"
      type="number"
      filled
    />
    <q-input
      square
      dense
      v-model.number="newField.max_val"
      label="Max Τιμή"
      type="number"
      filled

    />
    <q-btn dense square color="primary" icon="add" @click="addField"/>
  </q-card-section>
  </q-card>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'AddGradeField',
  props: {
    modelValue: {
      required: true
    }
  },
  setup (props, { emit }) {
    const newField = ref({
      key: '',
      title: '',
      min_val: 0,
      max_val: 5
    })

    const addField = () => {
      newField.value.key = newField.value.title.toLocaleLowerCase().replace(' ', '_')

      const temp = props.modelValue
      temp.push(newField.value)
      emit('update:modelValue', temp)

      newField.value = {
        key: '',
        title: '',
        min_val: 0,
        max_val: 5
      }
    }

    return {
      newField,

      addField
    }
  }
})
</script>
<style>

</style>
