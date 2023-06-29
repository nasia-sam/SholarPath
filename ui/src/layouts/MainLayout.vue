<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white">
      <q-toolbar>

        <q-toolbar-title class="text-primary">
          MSC Applications
        </q-toolbar-title>

        <div class="text-primary">
          <q-btn v-if="!isAuthenticated" flat icon="login">
            <q-tooltip>
              Σύνδεση για εκπαιδευτικό προσωπικό
            </q-tooltip>
            <q-menu>
              <div class="row q-pa-md" style="min-width: 100px">
                <div class="column">
                  <div class="text-h6 q-mb-md q-gutter-y-md">Login</div>
                  <q-input dense v-model="credentials.email" label="Email" />
                  <q-input dense :type="hidePwd ? 'password' : 'text'" v-model="credentials.password" label="Password" >
                    <template v-slot:append>
                      <q-icon
                        :name="hidePwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="hidePwd = !hidePwd"
                      />
                    </template>
                  </q-input>

                  <q-btn class="q-mt-md" color="secondary" @click="login">Login</q-btn>
                </div>
              </div>
            </q-menu>
          </q-btn>
          <q-btn v-else icon="logout" color="secondary" @click="logoutUser">
            <q-tooltip>Έξοδος</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered

      :mini="mini"
      @mouseover="mini = false"
      @mouseout="mini = true"

      :width="200"
      :breakpoint="500"
      class="bg-primary text-white"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Course Programs',
    icon: 'school',
    link: '/courses'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

import { defineComponent, ref } from 'vue'

import { storeToRefs } from 'pinia'

import useAuthorizationAction from 'src/hooks/Authentication/login'
import useloggedUser from 'src/store/auth'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    const mini = ref(false)

    const credentials = ref({
      email: '',
      password: ''
    })
    const hidePwd = ref(true)

    const userStore = useloggedUser()
    const { isAuthenticated } = storeToRefs(userStore)

    const { loginUser } = useAuthorizationAction()

    const login = () => {
      loginUser(credentials.value)
    }

    const logoutUser = () => {
      userStore.logout()
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      mini,
      credentials,
      hidePwd,
      isAuthenticated,
      login,
      logoutUser
    }
  }
})
</script>
