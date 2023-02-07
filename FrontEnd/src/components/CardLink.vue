<template>
    <q-card class="my-card">
        <q-card-section>
            <div class="text-overline">ShortURL: {{ link.nanoLink }}</div>
            <div class="text-caption text-grey">LongURL: {{ link.longLink }}</div>
            {{ link }}
        </q-card-section>

        <q-separator />

        <q-card-actions>
            <q-btn flat round icon="mdi-delete-outline" color="red" title="Eliminar URL" @click="deleteLink(link._id)" />
            <q-btn flat round icon="mdi-pencil-box-outline" color="orange"  title="Editar URL" @click="editLink(link)" />
            <q-btn flat round icon="mdi-content-copy" color="blue" title="Copiar Short URL" @click="copiarUrl(link.nanoLink)" />
        </q-card-actions>
        </q-card>
</template>

<script setup>
import { useLinkStore } from "../stores/link-store";
import { useQuasar } from "quasar";
import { useNotify } from "../composables/warningHooks";


const linkStore = useLinkStore()
const $q = useQuasar()
const { successNotify, errorNotify } = useNotify()

defineProps({
    link: Object
})
const deleteLink = async(_id) => {
    $q.dialog({
        title: 'Advertencia ⚠ 😨',
        message: 'Está seguro de eliminar este ShortLink',
        cancel: true,
        persistent: true
    }).onOk(async () => {
        try {
            await linkStore.removeLink(_id)
            successNotify('La URL ha sido borrada')
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
        }
    })

};

const editLink = (link) => {
    $q.dialog({
        title: 'Editar URL',
        message: 'Actualiza la URL',
        prompt: {
          model: link.longLink,
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(async(data) => {
        try {
            const updateLink = {...link, longLink: data}
            await linkStore.updateLink(updateLink)
            successNotify('La URL ha sido actualizada')
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
        }
      })
}

const copiarUrl = async(nanoLink) => {
    try {
        const path = `${process.env.FRONT_URI}/${nanoLink}`
        await navigator.clipboard.writeText(path);
        successNotify('Se ha copido el shortURL')
    } catch (e) {
        console.log(e);
        errorNotify(e)
    }
};

</script>