import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayUSDCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    data,
    fetchdata
}) => {

    const [editProduct,setEditProduct] = useState(false)

  return (
    <div className='bg-white p-4 rounded'>
        <div className='w-40'>
            <div className='w-32 h-32 flex justify-center items-center'>
                <img src={data?.productImage[0]} alt='' className='mx-auto object-fill h-full'/>
            </div>
            <h1 className='text-ellipsis line-clamp-1'>{data.productName}</h1>

            <div className=''>
                <div>
                    <p className='font-semibold'>
                        {
                            displayUSDCurrency(data.sellingPrice)
                        }
                        {/* {data.sellingPrice} */}
                    </p>
                    
                </div>
                <div className='w-fit ml-auto p-2 hover:bg-green-500 bg-green-100 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                    <MdEdit />
                </div> 
            </div>


             
        </div>
        {
            editProduct && (
                <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
            )
        }
    </div>
  )
}

export default AdminProductCard
