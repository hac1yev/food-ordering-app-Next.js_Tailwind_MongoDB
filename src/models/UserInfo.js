import { Schema, model, models } from "mongoose";

const UserinfoSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
    },
    streetAddress: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    admin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Userinfo = models.Userinfo || model('Userinfo', UserinfoSchema);