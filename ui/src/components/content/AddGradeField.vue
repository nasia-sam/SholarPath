<template>
  <q-card flat bordered class=" width-full q-pa-md">
    <q-card-section horizontal class="q-gutter-x-sm justify-between">
      <q-input
        square
        dense
        v-model="newField.title"
        style="width:60%"
        label="Title"
        filled
        hint="Must be unique for every course (case insesitive)."
      />
      <q-input
        square
        dense
        v-model.number="newField.weigth"
        label="Weigth"
        type="number"
        filled
      />

  </q-card-section>

  <q-card-section horizontal class="q-gutter-x-sm q-pt-md justify-between">
    <q-input
      square
      dense
      v-model.number="newField.min_val"
      label="Min Value"
      type="number"
      filled
    />
    <q-input
      square
      dense
      v-model.number="newField.max_val"
      label="Max Value"
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
      max_val: 0,
      weigth: 0.0
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
        max_val: 0,
        weigth: 0.0
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
