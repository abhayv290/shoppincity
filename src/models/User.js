const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({
    user_name: {type: String, required: true},
    email_id: {type: String, required: true, unique: true},
    pswd: {type: String, required: true}
}, {timestamps: true})


export default mongoose.models.User || mongoose.model("User", UserSchema);