import { Schema, model } from "mongoose";

const student = new Schema({
    subjects: {
        type: Schema.Types.ObjectId,
        required: false,
        ref:'subject',
    },
    student_id:{
        type: Schema.Types.ObjectId,
        required: false,
        ref:'user'
    },
    grade: {
        type: Boolean,
        require: false,
    }




}, { timestamps: true });
export default model("student", student);