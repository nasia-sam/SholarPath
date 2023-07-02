<template>
  <q-page padding>
    <q-page-container>

      <div class="width-full col text-center q-gutter-xl q-py-lg">
        <div  class="text-h4">
          <slot name="title"></slot>
        </div>
        <div class="text-subtitle2 text-grey-9">
          <slot name="description"></slot>
        </div>
        <div class="flex flex-center q-pt-md">
          <q-btn color="primary" @click="redirectToCourses">Προγράματα Σπουδών</q-btn>
        </div>
      </div>
    </q-page-container>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'StaticPage',
  setup () {
    const router = useRouter()

    // redirect to course page
    const redirectToCourses = () => {
      router.push('/courses')
    }

    return {
      redirectToCourses
    }
  }
})
</script>
