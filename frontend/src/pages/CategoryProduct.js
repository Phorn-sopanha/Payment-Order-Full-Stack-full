import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticlCard'

const CategoryProduct = () => {
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)

    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListInArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListInArray.forEach(el => {
        urlCategoryListObject[ el] = true
    });

    // console.log("urlCategoryListObject",urlCategoryListObject)
    // console.log("urlCategoryListInArray",urlCategoryListInArray)

    const [selectCategory,setSeleteCategory] = useState(urlCategoryListObject)
    const [filterCategoryList,setFilterCategoryList] = useState([])

    const [sortBy,setSortBy] = useState("")

    // console.log("sortBy",sortBy)

    const fetchData = async () => {
        const response = await fetch(SummaryApi.filterProduct.url,{
            method : SummaryApi.filterProduct.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                category : filterCategoryList
            })
        })

        const dataResponse = await response.json()

        setData(dataResponse?.data || [])
        console.log(dataResponse)
    }

    const handleSeleteCategory = (e) =>{
        const { name, value , checked } = e.target

        setSeleteCategory((preve) => {
            return{
                ...preve,
                [value] : checked
            }
        })
        // console.log("seletcategory",name,value,checked)
    }

    // console.log("selectCategory",selectCategory)

    useEffect(() => {
        fetchData()
    },[filterCategoryList])
    

    useEffect(() =>{
        const arrayCategory = Object.keys(selectCategory).map(categoryKeyName => {
            if(selectCategory[categoryKeyName]){
                return categoryKeyName
            }

            return null
            // console.log(categoryName)
        }).filter(el => el)

        setFilterCategoryList(arrayCategory)

        //format url change when change on check box
        const urlFormat = arrayCategory.map((el,index)=> {
            if((arrayCategory.length - 1) === index ){
                return `category=${el}`
            }
            
            return `category=${el}&&`
        })

        // console.log("urlFormat",urlFormat.join(""))
        navigate("/product-category?" + urlFormat.join(""))

        // console.log("selected C",arrayCategory)
    },[selectCategory])
    // params?.categoryName
    // console.log("category",)

    const handleOnChangeSortBy = (e)=>{
        const { value } = e.target
  
        setSortBy(value)
  
        if(value === 'asc'){
          setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
        }
  
        if(value === 'dsc'){
          setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
        }
      }
  
      useEffect(()=>{
  
      },[sortBy])

    return (
        <div className='container mx-auto p-4'>

            {/* desktop version */}
            <div className='hidden lg:grid grid-cols-[200px,1fr]'>
                {/*   left side */}
                <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
                    {/* Sort By */}
                    <div className=''>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"}/>
                                <label>Price - Low to Hight</label>                           
                            </div>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"}/>
                                <label>Price - Hight to Low</label>                           
                            </div>                              
                        </form>
                    </div>
                    {/* end sort By */}


                    {/* filter By */}
                    <div className=''>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Filter by</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            {
                            productCategory.map((categoryName,index)=>{
                                return(
                                <div className='flex items-center gap-3'>
                                    <input type='checkbox' value={categoryName?.value} checked={selectCategory[categoryName?.value]} name={"category"} id={categoryName?.value} onChange={handleSeleteCategory}/>
                                    <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                                </div>
                                )
                            })
                            }                       
                        </form>
                    </div>
                    {/* end filter by */}
                </div>

                {/*   right side */}
                {/***right side ( product ) */}
                <div className='px-4'>
                    <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] scrollbar-none'>
                    {
                        data.length !== 0 && !loading && (
                            <VerticalCard data={data} loading={loading}/>
                        )
                    }
                    </div>
                </div>
            </div>

            
        </div>
  )
}

export default CategoryProduct
