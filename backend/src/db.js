import mongoose from "mongoose";
import dotenv from 'dotenv-defaults';
export default{
    connect: ()=>{
        dotenv.config(); //find .env to read environment parameters
        mongoose
            .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            })
            .then((res) => console.log("mongo db connection created"));
    }
};