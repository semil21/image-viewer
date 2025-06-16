import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users"
    },
    image : {
        type : String
    }
})

const Images = mongoose.model("Images",imageSchema )

export default Images