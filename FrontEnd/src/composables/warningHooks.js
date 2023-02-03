import { useQuasar } from "quasar";

export const useAlert = () => {
    const $q = useQuasar()

    const showAlert = (message = "Error de servidor") => {
        $q.dialog({
            title: 'Error',
            message: message
        })
    }
    return { showAlert }
}

export const useNotify = () => {
    const $q = useQuasar()

    const successNotify = ( message = "Éxito" ) => {
        $q.notify({
            message,
            color: 'green',
            icon: '',
            position: 'top'
        })
    }

    const errorNotify = ( message = "Error de servidor" ) => {
        $q.notify({
            message,
            color: 'negative',
            icon: 'report_problem',
            position: 'center'
        })
    }

    return { successNotify, errorNotify }
}