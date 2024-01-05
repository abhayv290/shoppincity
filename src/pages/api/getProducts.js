import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    let Products = await Product.find()
    res.status(200).json({Products})
}

export default connectDb(handler);


