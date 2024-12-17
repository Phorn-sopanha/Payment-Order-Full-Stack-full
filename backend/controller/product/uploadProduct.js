const uploadProductPermission = require("../../helper/permission")
const productModel = require("../../models/productModel")

async function UploadProductController(req,res) {
    try{
        const sessionUserId = req.userId

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        const UploadProduct = new productModel(req.body)
        const saveProduct = await UploadProduct.save()

        res.status(201).json({
            message : "Product upload successfully",
            data : saveProduct,
            success : true,
            error : false,   
        })


    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
    
}

module.exports = UploadProductController