import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    //Wrapping In try Catch to tackle errors
    try {
        let Products = await Product.find()
        let tshirts = {};
        for (let item of Products) {
            if (item.title in tshirts) {
                if (!(tshirts[item.title].color.includes(item.color)) && item.available_qty > 0) {
                    tshirts[item.title].color.push(item.color);
                    tshirts[item.title].available_qty += item.available_qty;
                }
                if (!(tshirts[item.title].size.includes(item.size)) && item.available_qty > 0) {
                    tshirts[item.title].size.push(item.size);
                    tshirts[item.title].available_qty += item.available_qty;
                }

            }
            else {
                tshirts[item.title] = JSON.parse(JSON.stringify(item))

                if (item.available_qty > 0) {
                    tshirts[item.title].color = [item.color]
                    tshirts[item.title].size = [item.size]
                }

            }
        }

        res.status(200).json({tshirts})
    } catch (error) {
        console.error(error);
    }
}

export default connectDb(handler);


