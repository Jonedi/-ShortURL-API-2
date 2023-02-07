<template>
    <div>
        <q-page class="row justify-center">
            <div class="col-12 col-sm-6 col-md-5">
                <div class="row justify-center">
                    <img class="logo-style q-mt-lg" src="../assets/logo-jetcode.png" alt="logo jetcode" />
                </div>
                <h3 class="text-center">SignUp</h3>
                <q-form @submit.prevent="handleSubmit" ref="form">
                    <q-input
                        v-model="email"
                        type="text"
                        label="Ingrese su correo electrónico"
                        :rules="[
                            val => val && val.length > 0 || 'Por favor ingrese un email válido',
                            val => /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val) || 'Formato de email incorrecto'
                        ]"
                        lazy-rules
                    ></q-input>
                    <q-input
                        v-model="password"
                        type="password"
                        label="Ingrese contraseña"
                        :rules="[ val => val && val.length > 5  || 'Ingrese una contraseña mayor a 6 caracteres']"
                        lazy-rules
                    ></q-input>
                    <q-input
                        v-model="repassword"
                        type="password"
                        label="Repita contraseña"
                        :rules="[ val => val === password  || 'Las contraseñas no coinciden']"
                    ></q-input>
                    <div class="q-mt-sm">
                        <q-btn label="login" type="submit" color="primary"></q-btn>
                    </div>
                    <div class="text-center q-mt-md">
                        <p>
                            Ya tiene cuenta de usuario.
                            <router-link to="/login">Haga click aquí</router-link>
                        </p>
                    </div>
                </q-form>
            </div>
        </q-page>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from "vue";
import { useUserStore } from "../stores/user-store";
import { useAlert } from "../composables/warningHooks";

const router = useRouter()
const userStore = useUserStore();
const alert = useAlert()

const email = ref('')
const password = ref('')
const repassword = ref('')
const form = ref(null)

const handleSubmit = async () => {
    // console.log(email.value, password.value, repassword.value);
    try {
        await userStore.register(email.value, password.value, repassword.value)
        email.value = ''
        password.value = ''
        form.value.resetValidation()
        router.push('/')
    } catch (e) {
        // console.log(e.message);
        if(e.message){
            alert.showAlert(e.message)
        } else if(e.errors[0].msg) {
            alert.showAlert(e.errors[0].msg)
        } else {
            alert.showAlert()
        }        
    }
};
</script>

<style lang="scss">
.logo-style {
    width: 25%;
    height: auto;
}
</style>