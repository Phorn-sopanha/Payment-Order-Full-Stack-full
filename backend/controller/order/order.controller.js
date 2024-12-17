const orderModel = require("../../models/orderProductModel")

const orderController = async (request,response) => {
    try{
        const currectUserId = request.userId

        const orderList = await orderModel.find({ userId : currectUserId }).sort({createdAt : -1})

        response.json({
            data : orderList,
            message : "Order List",
            success : true
        })
    }catch(error){
        response.status(500).json({
            message : err?.message || err,
            error : true,
            success : false,
        })
    }
}

module.exports = orderController