const mongoose = require("mongoose")

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGOOSE_URI)
    }catch(err){
        console.log(err)
    }
    
}
module.exports = connectDB