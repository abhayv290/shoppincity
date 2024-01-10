import connectDb from "@/middleware/mongoose";
import User from "@/models/User";
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    try {

        if (req.method == 'POST') {
            let user = await User.findOne({email_id: req.body.email})

            let comparePassword = bcrypt.compareSync(req.body.password, user.pswd);
            if (user && req.body.email == user.email_id && comparePassword) {
                const token = await jwt.sign({name: user.user_name, email: user.email_id}, 'Nikhil', {expiresIn: '7d'});
                res.status(200).json({success: true, webtoken: token});
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


