<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated v-if="userStore.token">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <q-btn color="dark" class="q-mr-sm" to="/">Inicio</q-btn>
        <q-btn color="orange" class="q-mr-sm" to="/protected">Protected</q-btn>
        <q-btn color="purple" class="q-mr-sm" to="/about">About</q-btn>
        <q-btn color="red" class="q-mr-sm" @click="logOut">LogOut</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useUserStore } from "../stores/user-store";
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()

const logIn = async () => {
  await userStore.access()
  router.push('/')
}

const logOut = async () => {
  await userStore.logout()
  router.push('/login')
}

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const essentialLinks = [
  {
    title: 'JonTmarz',
    caption: 'jontmarz',
    icon: 'school',
    link: 'https://jontmarz.netlify.app'
  },
  {
    title: 'Github',
    caption: 'github.com/jonedi',
    icon: 'code',
    link: 'https://github.com/Jonedi'
  },
  {
    title: 'WhatsApp',
    caption: 'chat.whatsapp',
    icon: 'chat',
    link: 'https://api.whatsapp.com/send/?phone=573194356458&text&type=phone_number&app_absent=0'
  },
  /* {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  }, */
  {
    title: 'Twitter',
    caption: '@JonTMarz',
    icon: 'rss_feed',
    link: 'https://twitter.com/JonTMarz'
  },
  {
    title: 'Facebook',
    caption: '@Ing.Johntorres',
    icon: 'public',
    link: 'https://www.facebook.com/Ing.Johntorres'
  },
  /* {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  } */
];
</script>
