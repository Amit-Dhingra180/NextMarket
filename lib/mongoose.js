import mongoose from "mongoose";

export async function initMongoose(){
    if(mongoose.connect.readyState === 1){
        return mongoose.connection.asPromise();
    }
    return await mongoose.connect("mongodb+srv://amit:osirisis@cluster0.tfyzske.mongodb.net/test-ecommerce?retryWrites=true&w=majority");
}

