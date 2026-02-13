const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default:
                "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: (v) => v === ""
                ? "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                : v,
        }
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    }
}); 

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing; 