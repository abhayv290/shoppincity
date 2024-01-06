const mongoose = require('mongoose');


//A async function for DB connection
const connectDb = handler => async (req, res) => {
    try {

        if (mongoose.connections[0].readyState) {
            return handler(req, res);
        }
        await mongoose.connect(process.env.MONGO_URI);
        return handler(req, res);
    } catch (error) {
        console.log(error);
    }

}
export default connectDb;



