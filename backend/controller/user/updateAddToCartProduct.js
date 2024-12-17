const addToCartModel = require("../../models/CartProduct")

const updateAddToCartProduct = async (req,res) =>{
    try{
        const currentUserId = req.currentUserId
        const addToCartProductId = req?.body?._id

        const qty = req.body.quantity

        const updateProduct = await addToCartModel.updateOne({_id : addToCartProductId},{
            ...(qty && {quantity : qty})
        })

        res.json({
            message : "Product cart updated",
            data : updateProduct,
            success : true,
            error : false,
        })

    }catch(error){
        res.json({
            message : err?.message || err,
            error : true,
            success : false,
        })
    }
}

module.exports = updateAddToCartProduct