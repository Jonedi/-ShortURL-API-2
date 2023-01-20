import { Url } from "../models/Links.js"
import { nanoid } from "nanoid";

export const getLinks = async(req, res) => {
    try {
        const links = await Url.find({ uid: req.uid }).lean()
        return res.status(201).json({ links })
    } catch (e) {
        console.log(e);
        return res.status(500).json({ status: 500, error: "Error de servidor", message: e.message })
    }
}

export const createLink = async(req, res) => {
    try {
        let { longLink } = req.body
        if (!longLink.startsWith("htt")) {
            longLink = `https://${longLink}`
        } else {
            longLink
        }
        const link = new Url({ longLink, nanoLink: nanoid(6), uid:req.uid })
        const newLink = await link.save()
        res.status(201).json({ status: 201, newLink })
        // res.json({ link })
    } catch (e) {
        console.log(e);
        return res.status(500).json({status: 500, error: "error de servidor", message: e.message})
    }
}

export const removeLink = async(req, res) => {
    try {
        const { id } = req.params
        const link = await Url.findById(id)
        if(!link) return res.status(404).json({ status: 404, error: "NO existe el link"})
        if(!link.uid.equals(req.uid)) return res.status(401).json({ status:401, error: "No es tu link payaso 🤡" })

        await link.remove()
        return res.json({ link })
    } catch (e) {
        console.log(e);
        if (e.kind === "ObjectId") {
            return res.status(403).json({ status: 403, error:"Formato Id Incorrecto", message: e.message })
        }
        return res.status(500).json({ status:403, error: "Error de servidor", message: e.message })
    }
}

export const updateLink = async(req, res) => {
    try {
        const { id } = req.params
        let { longLink } = req.body
        if (!longLink.startsWith("htt")) {
            longLink = `https://${longLink}`
        } else {
            longLink
        }

        const link = await Url.findById(id)
        if(!link) return res.status(404).json({ status: 404, error: "NO existe el link"})
        if(!link.uid.equals(req.uid)) return res.status(401).json({ status:401, error: "No es tu link payaso 🤡" })
        
        link.longLink = longLink
        await link.save()
        res.status(200).json({ link })
    } catch (e) {
        console.log(e);
        if(e.kind === "ObjectId") return res.status(403).json({ status: 403, error: "formato de Id Incorrecto", message: e.message })
        return res.status(500).json({ status:403, error: "Error de servidor", message: e.message })
    }
}

export const getNanoLink = async(req, res) => {
    try {
        const { id } = req.params
        const link = await Url.findById(id)

        if(!link) return res.status(404).json({ status: 404, error: "No existe el link" })
        if(!link.uid.equals(req.uid)) return res.status(401).json({ status: 401, error: "La url consultada no le pertenece 🤡" })
        
        return res.json({ longLink: link.longLink })
    } catch (e) {
        console.log(e);
        if(e.kind === "ObjectId") return res.status(403).json({ status: 403, error: "Formato id incorrecto", message: e.message})
        return res.status(500).json({ status: 500, error: "error de servidor", message: e.message })
    }
}