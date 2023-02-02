import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useUserStore } from "../stores/user-store";

export const useLinkStore = defineStore('link', () => {
    const links = ref([])
    const userStore = useUserStore()

    const createLink = async (longLink) => {
        try {
            const res = await api({
                url: "/links",
                method: "POST",
                headers: { Authorization: `Bearer ${userStore.token}` },
                data: { longLink }
            })
            // console.log(res.data);
            links.value.push(res.data.newLink)
        } catch (e) {
            // console.log(e.response?.data || e);
            throw e.response?.data || e
        }
    }

    const getlinks = async () => {
        try {
            console.log('llamando a todos los links');
            const res = await api({
                url: "/links",
                method: "GET",
                headers: { Authorization: `Bearer ${userStore.token}` }
            })
            console.log(res.data);
            links.value = [...res.data.links]

        } catch (e) {
            console.log(e.response?.data || e);
        }
    }

    getlinks()

    return {
        links,
        createLink,
        getlinks
    }
})