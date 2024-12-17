const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');
// Store hash in your password DB.

async function userSignUpController(req,res) {
    try{
        const { email , password , name} = req.body

        const user = await userModel.findOne({email})
        if(user){
            throw new Error("Already user exit !")
        }

        if(!email){
            throw new Error("Please provid Email !")
        }
        if(!password){
            throw new Error("Please provid password !")
        }
        if(!name){
            throw new Error("Please provid name !")
        }

        // this two are the same
        // const userDate = new userModel({
        //     email,
        //     password,
        //     name,
        // })

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);
        if(!hashPassword){
            throw new Error("Something got wrong !")
        }
        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword
        }
        const userDate = new userModel(payload)
        const saveUser = await userDate.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "User create Successfully"
        })


    }catch(err){
        res.json({
            message : err.message || err ,
            error : true,
            success : false,
        })
    }
    
}

module.exports = userSignUpController