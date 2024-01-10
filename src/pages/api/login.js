import connectDb from "@/middleware/mongoose";
import User from "@/models/User";


const handler = async (req, res) => {
    try {
        if (req.method == 'POST') {
            let user = await User.findOne({email_id: req.body.email})


            if (user && req.body.email == user.email_id && req.body.password == user.pswd) {
                res.status(200).json({success: [user.email_id, user.pswd]})
            }

            else {
                res.status(401).send("Invalid Credentials");
            }
        }

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
export default connectDb(handler);


