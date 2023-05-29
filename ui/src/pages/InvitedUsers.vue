<template>
  <q-page padding>

  </q-page>
</template>
<script>
import { defineComponent, onMounted } from 'vue'

import useUserInvitations from 'src/hooks/User/invitations'

export default defineComponent({
  name: 'InvitedUsers',
  setup () {
    const columns = [
      { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
      { name: 'email', align: 'center', label: 'email', field: 'email', sortable: true },
      { name: 'email', align: 'center', label: 'email', field: 'email', sortable: true },
      { name: 'roles', align: 'center', label: 'roles', field: 'roles', sortable: true }
    ]
    const { fetchInvitedUsers, result: users } = useUserInvitations()

    onMounted(async () => {
      await fetchInvitedUsers()
    })

    return {
      columns,
      users
    }
  }
})
</script>
<style>

</style>
