import mongoose from "mongoose";


try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.URI_DB)
    console.log("Conexión a la DB Ok 👍");
} catch (e) {
    console.log("error de conexión a Mongo " + e);
}