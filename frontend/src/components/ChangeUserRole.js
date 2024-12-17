import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoCloseSharp } from "react-icons/io5";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole,setUserRole] = useState(role)

    const handleOnchangeSelect = (e) =>{
        setUserRole(e.target.value)

        console.log(e.target.value)
    }

    const updateUserRole = async() => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url,{
            method : SummaryApi.updateUser.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                userId : userId,
                role : userRole
            })
        })
        const responseData = await fetchResponse.json()

        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunc()
        }
        
        console.log("respon",responseData)
    }

  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 w-full h-full flex z-10 justify-between items-center bg-slate-200 bg-opacity-60'>
       <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
            
            <button className='block ml-auto' onClick={onClose}>
                <IoCloseSharp />
            </button>
            
            <h1 className='pb-4 text-lg font-medium'>ChangeUserRole</h1>
            <p>NAME : {name}</p>
            <p>EMAIL : {email}</p>
            
            <div className='flex items-center justify-between my-4'>
                <p>ROLE</p>
                <select className='border px-4 py1' value={userRole} onChange={handleOnchangeSelect}>
                    {
                        Object.values(ROLE).map(el =>{
                            return(
                                <option value={el} key={el}>{el}</option>
                            )
                        })
                    }
                    
                </select>
            </div>
            
            <button className='w-fit mx-auto block border py-1 px-3 rounded-full bg-gray-200 hover:bg-gray-500 hover:text-white' onClick={updateUserRole}>Change Role</button>

       </div>
    </div>
  )
}

export default ChangeUserRole
