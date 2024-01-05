const mongoose = require('mongoose');



//Creating Schemas for the Product Page

const OrderSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    products: [{
        product_id: {type: String, },
        quantity: {type: Number, default: 1}
    }
    ],
    address: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, default: pending, required: true},
}, {timestamps: true})


const Order = mongoose.model("Order", OrderSchema);

export default Order

