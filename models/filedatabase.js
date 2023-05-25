import { Schema,model } from "mongoose";

const filed=new Schema({
    avatar:{
        type:String,
        required:false,
    },
    subjects:{
        type: Schema.Types.ObjectId,
        required: false,
        ref:'subject'
    },
    doctor:{
        type: Schema.Types.ObjectId,
        required: false,
        ref:'user'
    }
},{timestamps:true})
export default model('doctor_file',filed);