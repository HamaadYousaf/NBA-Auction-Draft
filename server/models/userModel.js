import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        team: String,
        pos: String
    }
);

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        bidAmount: {
            type: Number,
            default: 200
        },
        team: {
            type: [teamSchema],
        },
        userTeams: {
            type: [[teamSchema]],
        }
    }
);

export const User = mongoose.model('User', userSchema);