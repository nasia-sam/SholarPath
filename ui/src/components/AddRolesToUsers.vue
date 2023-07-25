<template>
  <q-dialog v-model="visible">
    <q-layout view="Lhh lpR fff" container class="bg-white q-pa-md" style="height: 550px">

      <q-header>
        <q-toolbar>
          <q-toolbar-title>Ρόλοι</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding class="q-gutter-lg q-pa-md">
          <q-list bordered separator class="bg-white">
            <q-item v-for="course in coursePrograms" :key="course.id">
              <q-item-section>{{ course.title }}</q-item-section>
              <q-item-section side>
                <q-btn
                  v-if="!hasRoleMap[course.id]"
                  round
                  color="green"
                  size="sm"
                  icon="add"
                  :loading="loading"
                  @click="confirmAddRole(course.id)"
                  >
                    <q-tooltip>Προσθήκη Ρόλου Moderator</q-tooltip>
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

import useRoleMutations from 'src/hooks/Roles/useRolesActions'

export default defineComponent({
  name: 'AddRolesToUsers',
  props: {
    coursePrograms: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const $q = useQuasar()

    const visible = ref(false)

    const userId = ref('')
    const hasRoleMap = ref()

    const open = (user) => {
      userId.value = user.id
      hasRoleMap.value = props.coursePrograms.reduce((acc, cur) => {
        acc[cur.id] = (user.roles.findIndex(r => r.course.id === cur.id) !== -1)
        return acc
      }, {})

      console.log('AAAA', hasRoleMap.value)

      visible.value = true
    }

    const { useAddRole, loading } = useRoleMutations()

    const confirmAddRole = (id) => {
      $q.dialog({
        title: 'Προσθήκη Ρόλου Moderator',
        message: 'Είστε σίγουροι;\n Ο χρήστης θα έχει δικαίωμα να αξιολογεί αιτήσεις στο συγκεκριμένο ΠΜΣ.',
        cancel: true,
        persistent: true
      }).onOk(() => {
        useAddRole(userId.value, id)
          .then(() => { hasRoleMap.value[id] = true })
      })
    }

    return {
      visible,
      loading,
      hasRoleMap,
      open,
      confirmAddRole
    }
  }
})
</script>
