import connectDb from "@/middleware/mongoose";
import User from "@/models/User";


const handler = async (req, res) => {
    try {
        if (req.method == 'POST') {
            let newUser = new User({
                user_name: req.body.name,
                email_id: req.body.email_id,
                pswd: req.body.password
            })
            await newUser.save();
            res.status(200).json({newUser})
        }
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error (email_id is not unique)
            res.send('Email address must be unique');
        } else {
            // Handle other errors
            res.status(500).json({error: error.message});
        }
    }
}
export default connectDb(handler);