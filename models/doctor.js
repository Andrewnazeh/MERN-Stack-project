import { Schema, model } from "mongoose";

const doctor = new Schema({
    subjects: {
        type: Schema.Types.ObjectId,
        required: false,
        ref:'subject',
    },

    doc_id: {
        type: Schema.Types.ObjectId,
        required: false,
        ref:'user'
    }

}, { timestamps: true });
export default model("doctor", doctor);