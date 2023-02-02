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

    const showNotify = (
        message = "Error de servidor",
        color = 'negative',
        icon = 'report_problem',
        position = 'bottom'
    ) => {
        $q.notify({
            message,
            color,
            icon: icon || null,
            position
        })
    }

    return { showNotify }
}