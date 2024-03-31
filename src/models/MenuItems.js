import { Schema, model, models } from "mongoose";

const menuItemsSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    basePrice: {
        type: String
    }
}, { timestamps: true });

export const MenuItem = models.MenuItem || model('MenuItem', menuItemsSchema); 