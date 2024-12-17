import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import VerticlCard from '../components/VerticlCard'

const SearchProduct = () => {

    const query = useLocation()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    console.log("query",query.search)

    const fetchProduct = async ()=> {
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url+query.search)
        const dataResponse = await response.json()
        setLoading(false)


        setData(dataResponse.data)

        // console.log("dataResponse", dataResponse)
    }

    useEffect(()=> {
        fetchProduct()
    },[query])

  return (
    <div className='container mx-auto p4'>
        {
            loading && (
                <p className='text-lg text-center'>Loading...</p>
            )      
        }
            <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

        {
            data.length === 0 && !loading && (
                <p className='bg-white text-lg text-center p-4'>Search Not Found ... !</p>
            )
        }
        {
            data.length !== 0 && !loading && (
                <VerticlCard loading={ loading} data={data} />
            )
        }
        
    </div>
  )
}

export default SearchProduct
