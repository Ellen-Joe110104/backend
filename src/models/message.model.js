import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: { types: String, required: true },
    receiverId: { types: String, required: true },
    content: {  types: String, required: true },

}, {timestamps: true});
;