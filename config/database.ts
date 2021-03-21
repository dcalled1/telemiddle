import mongoose from "mongoose";


if(process.env.DB_HOST) {
    const host:string = process.env.DB_HOST;
} else throw new Error("DB_HOST not found in .env file")

mongoose.connect(process.env.DB_HOST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Conection to database done!"))
.catch(err => console.error(err));