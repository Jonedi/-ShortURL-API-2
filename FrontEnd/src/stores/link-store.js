import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useUserStore } from "../stores/user-store";
import { useQuasar } from 'quasar'

export const useLinkStore = defineStore('link', () => {
    const links = ref([])
    const userStore = useUserStore()
    const $q = useQuasar()

    const createLink = async (longLink) => {
        try {
            $q.loading.show()
            const res = await api({
                url: "/links",
                method: "POST",
                headers: { Authorization: `Bearer ${userStore.token}` },
                data: { longLink }
            })
            links.value.push(res.data.newLink)
        } catch (e) {
            throw e.response?.data || e
        } finally {
            $q.loading.hide()
        }
    }

    const getlinks = async () => {
        try {
            $q.loading.show()
            const res = await api({
                url: "/links",
                method: "GET",
                headers: { Authorization: `Bearer ${userStore.token}` }
            })
            console.log(res.data);
            links.value = [...res.data.links]

        } catch (e) {
            throw e.response?.data || e
        } finally {
            $q.loading.hide()
        }
    }

    const removeLink = async(_id) => {
        try {
            $q.loading.show()
            await api({
                url:`/links/${_id}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${userStore.token}` }
            })
            links.value = links.value.filter(i => i._id !== _id)
        } catch (e) {
            throw e.response?.data || e
        } finally {
            $q.loading.hide()
        }
    }

    const updateLink = async(updateLink) => {
        try {
            $q.loading.show()
            await api({
                url:`/links/${updateLink._id}`,
                method: "PATCH",
                headers: { Authorization: `Bearer ${userStore.token}` },
                data: {longLink: updateLink.longLink}
            })
            links.value = links.value.map(i => i._id === updateLink._id ? updateLink : i)
        } catch (e) {
            throw e.response?.data || e
        } finally {
            $q.loading.hide()
        }
    }

    getlinks()

    return {
        links,
        createLink,
        getlinks,
        removeLink,
        updateLink
    }
})