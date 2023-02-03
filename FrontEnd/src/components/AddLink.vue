<template>
    <q-form @submit.prevent="addLink" ref="formAdd">
        <q-input
            v-model="link"
            type="text"
            label="Ingrese una URL aquí"
            :rules="[ val => /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(val)  || 'Ingrese una url válida. No olvide colocar https:// al inicio']"
            lazy-rules
        />
        <div class="q-mt-sm">
            <q-btn label="Agregar URL" type="submit" color="primary" :loading="loading"></q-btn>
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
const { successNotify, errorNotify } = useNotify()
const formAdd = ref(null)

const addLink = async() => {
    try {
        loading.value = true
        await linkStore.createLink(link.value)
        successNotify('La URL ha sido guardada')
        link.value = ''
        formAdd.value.resetValidation()
    } catch (e) {
        console.log(e);
        if(e.message){
            errorNotify(e.message)
        } else if(e.errors) {
            console.log(e.errors);
            return e.errors.forEach(i => {
                errorNotify(i.msg)
            });
        } else {
            errorNotify()
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