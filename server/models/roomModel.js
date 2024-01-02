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
        },
        running: {
            type: Boolean,
            default: false
        }
    }
);

export const Room = mongoose.model('Room', roomSchema);