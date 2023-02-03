<template>
  <q-page padding>
    <add-link />
    <template
      v-for="link in linkStore.links"
      :key="link._id"
    >
      <card-link :link="link" class="q-my-md" />
    </template>
    <!-- <pre>{{ linkStore.links }}</pre> -->
  </q-page>
</template>

<script setup>
import { useLinkStore } from "src/stores/link-store";
import addLink from '../components/AddLink.vue'
import CardLink from '../components/CardLink.vue'

const linkStore = useLinkStore();

</script>
