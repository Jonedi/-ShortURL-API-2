<template>
    <q-form @submit.prevent="addLink">
        <q-input
            v-model="link"
            type="text"
            label="Ingrese un Link aquí"
            :rules="[ val => /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(val)  || 'Ingrese una url válida. No olvide colocar https:// al inicio']"
        />
        <div class="q-mt-sm">
            <q-btn label="Agregar Url" type="submit" color="primary" :loading="loading"></q-btn>
        </div>
    </q-form>
</template>
<script setup>
import { ref } from 'vue';
import { useLinkStore } from "../stores/link-store";
import { useNotify } from "../composables/warningHooks";

const link = ref('')
const loading = ref(false)
const linkStore = useLinkStore()
const notify = useNotify()

const addLink = async() => {
    try {
        loading.value = true
        await linkStore.createLink(link.value)
        notify.showNotify('Se ha enviado la url', 'green', null, 'top')
        link.value = ''
    } catch (e) {
        console.log(e);
        if(e.message){
            notify.showNotify(e.message, 'center' )
        } else if(e.errors) {
            console.log(e.errors);
            return e.errors.forEach(i => {
                notify.showNotify(i.msg, 'center' )
            });
        } else {
            notify.showNotify()
        }
    } finally {
        loading.value = false
    }
};

const alertError = (message = "Error de servidor") => {
    $q.notify({
        message: message,
        color: 'secondary',
        position: 'center'
    })
};
</script>