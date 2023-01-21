<template>
  <q-page padding>
    <q-btn @click="access">Ingresar</q-btn>
    <q-btn @click="create">Crear</q-btn>
    <p>{{ "token " + token }} - {{ expiresIn + " seg" }}</p>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { ref } from 'vue';

const token = ref('')
const expiresIn = ref('')

const access = async () => {
  try {
    const res = await api.post("/auth/login", {
      email: "test@test.com",
      password: "12341234"
    })
    // console.log(res.data);
    token.value = res.data.token
    expiresIn.value = res.data.expiresIn
  } catch (e) {
    console.log(e);
  }
}

const setTime = () => {
  setTimeout( () => { refreshToken() }, expiresIn.value * 1000 - 6000 )
}

const refreshToken = async () => {
  try {
    const res = await api.get("/auth/refresh")
    token.value = res.data.token;
    expiresIn.value = res.data.expiresIn;
    setTime();
  } catch (e) {
    console.log(e);
  }
}

refreshToken();

const create = async () => {
  try {
    const res = await api({
      method: "POST",
      url:    "/links",
      data: { longLink: "https://quasar.dev/start/quasar-cli" },
      headers: { Authorization: `Bearer${token.value}` }
    })
    console.log(res.data)
  } catch (e) {
    console.log(e);
  }
};
</script>
