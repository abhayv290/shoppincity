const mongoose = require('mongoose');


//Creating Schemas for the Product Page

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true, unique: true, dropDups: true},
    desc: {type: String, required: true},
    img: {type: String, required: true},
    category: {type: String, required: true},
    size: {type: String},
    color: {type: String},
    price: {type: String, required: true},
    available_qty: {type: Number, required: true},

}, {timestamps: true})

mongoose.models = {};
const Product = mongoose.model("Product", ProductSchema);

export default Product

