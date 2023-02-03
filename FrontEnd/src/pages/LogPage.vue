<template>
    <div>
        <q-page class="row justify-center">
            <div class="col-12 col-sm-6 col-md-5">
                <h3 class="text-center">Login</h3>
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
                    />
                    <q-input
                        v-model="password"
                        type="password"
                        label="Ingrese contraseña"
                        :rules="[ val => val && val.length > 5  || 'Ingrese una contraseña mayor a 6 caracteres']"
                        lazy-rules
                    ></q-input>
                    <div class="q-mt-sm">
                        <q-btn label="login" type="submit" color="primary"></q-btn>
                    </div>
                    <div class="text-center q-mt-md">
                        <p>
                            No tiene cuenta de usuario.
                            <router-link to="/signup">Haga click aquí</router-link>
                        </p>
                    </div>
                </q-form>
            </div>
        </q-page>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useUserStore } from "../stores/user-store";
import { useAlert } from "../composables/warningHooks";

const router = useRouter()
const userStore = useUserStore();
const alert = useAlert()

const email = ref('')
const password = ref('')
const form = ref(null)

const handleSubmit = async () => {
    try {
        await userStore.access(email.value, password.value)
        email.value = ''
        password.value = ''
        form.value.resetValidation()
        router.push('/')
    } catch (e) {
        console.log(e);
        if(e.message){
            alert.showAlert(e.message)
        } else if(e.errors) {
            console.log(e.errors);
            return e.errors.forEach(i => {
                alert.showAlert(i.msg)
            });
            
        } else {
            alert.showAlert()
        }
    }
}

/* const alertError = (message = "Error de servidor") => {
    $q.dialog({
        title: 'Error',
        message: message
    })
}; */
</script>