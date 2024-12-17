const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct = async (category) =>{
    const response = await fetch(SummaryApi.categoryWistProduct.url,{
        method : SummaryApi.categoryWistProduct.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category : category
        })
    })

    const dataResponse = await response.json()

    return dataResponse
}

export default fetchCategoryWiseProduct