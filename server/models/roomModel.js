import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        users: {
            type: Array,
        }
    }
);

export const Room = mongoose.model('Room', roomSchema);