import { Schema, model } from 'mongoose'

const urlSchema = new Schema ({
    longLink: {
        type:       String,
        required:   true,
        trim:       true,
    },
    nanoLink: {
        type:       String,
        required:   true,
        trim:       true,
        unique:     true
    },
    uid: {
        type:       Schema.Types.ObjectId,
        ref:        "User",
        required:   true
    }
})

export const Url = model("Url", urlSchema) 