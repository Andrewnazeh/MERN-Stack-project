import { Schema, model } from "mongoose";

const user = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    kind: {
        type: String,
        required: false,
    }
}, { timestamps: true });
export default model("user", user);