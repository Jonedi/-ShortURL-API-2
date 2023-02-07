import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const user      = ref(null)
    const token     = ref(null)
    const expiresIn = ref(null)

    const access = async (email, password) => {
        try {
            const res = await api.post("/auth/login", { email, password })
            token.value = res.data.token
            expiresIn.value = res.data.expiresIn
            localStorage.setItem('user', '🔥🔥')
            setTime()
            return res.data
        //   const res = await api.post("/auth/login", { email: 'test3@test.com', password: '12341234' })
        } catch (e) {
          if (e.response) throw e.response.data
          throw { error: 'error de servidor' }
        }
    }

    const register = async (email, password, repassword) => {
        try {
            const res = await api.post("/auth/signup", { email, password, repassword })
            token.value = res.data.token
            expiresIn.value = res.data.expiresIn
            localStorage.setItem('user', '🔥🔥')
            setTime()
            return res.data
        } catch (e) {
          if (e.response) throw e.response.data
          throw { error: 'error de servidor' }
        }
    }

    const setTime = (email, password) => {
        setTimeout( () => { refreshToken() }, expiresIn.value * 1000 - 6000 )
    }
    
    const refreshToken = async () => {
        try {
            const res = await api.get("/auth/refresh")
            token.value = res.data.token;
            expiresIn.value = res.data.expiresIn;
            localStorage.setItem('user', '🔥🔥')
            setTime();
        } catch (e) {
            console.log(e);
            localStorage.removeItem('user')
        }
    }

    const logout = async () => {
        try {
            await api.get("/auth/logout")
        } catch (e) {
            console.log(e);
        } finally {
            resetStore();
            localStorage.removeItem('user')
        }
    }

    const resetStore = () => {
        user.value      = null
        token.value     = null
        expiresIn.value = null
    }

    return {
        user,
        token,
        expiresIn,
        access,
        register,
        refreshToken,
        logout
    }
})