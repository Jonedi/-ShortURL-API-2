import { Url } from "../models/Links.js";

export const redirectNanoLink = async (req, res) => {
    console.log('entro');
    try {
        const { nanoLink } = req.params
        
        const link = await Url.findOne({ nanoLink })

        if(!link) return res.status(404).json({ link, error: "no existe el NanoLink" })

        return res.redirect(link.longLink)
    } catch (e) {
        console.log(e);
        if(e.kind === "ObjectId") return res.status(403).json({ status: 403, error: "formato de Id Incorrecto", message: e.message })
        return res.status(500).json({ status:403, error: "Error de servidor", message: e.message })
    }
}