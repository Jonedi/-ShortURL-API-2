export const errorsToken = (message) => {
    switch (message) {
        case "jwt malformed":
            return "Formato no válido"
            break;
        case "invalid token":
        case "jwt expired":
        case "invalidate signature":
        case "jwt signature is required" :
            return "Token no válido"
            break;
        default:
            return message
    }
}