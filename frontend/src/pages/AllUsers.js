import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {

    const [allUser,setAllUsers] = useState([])
    const [openUpdateRole , setOpenUpdateRole ] = useState(false)
    const [updateUserDetails , setUpdateUserDetails] = useState({
      email : "",
      name : "",
      role : "",
      _id : "",
    })

    const fetchAllUsers = async() =>{
        const fetchData = await fetch(SummaryApi.allUser.url,{
            method : SummaryApi.allUser.method,
            credentials : 'include',
        })

        const dataResponse = await fetchData.json()

        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

    }

    useEffect(()=>{
        fetchAllUsers()
    },[])
  return (
    <div className='bg-white pb-4'>
        <table className='w-full userTable'>
          <thead>
            <tr className='bg-black text-white'>
              <th>No</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>CREATED DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {
              allUser.map((el,index) =>{
                return(
                  <tr>
                    <td>{index+1}</td>
                    <td>{el?.name}</td>
                    <td>{el?.email}</td>
                    <td>{el?.role}</td>
                    <td>{moment(el?.createdAt).format('LL')}</td>
                    <td>
                      <button className='p-2 cursor-pointer hover:text-red-500' 
                        onClick={()=>{
                          setUpdateUserDetails(el)
                          setOpenUpdateRole(true)

                        }}>
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
          {
            openUpdateRole && (
              <ChangeUserRole 
                onClose={()=>setOpenUpdateRole(false)}
                name={updateUserDetails.name}
                email={updateUserDetails.email}
                role={updateUserDetails.role}
                userId={updateUserDetails._id}
                callFunc={fetchAllUsers}
              />
            )
          }
        
    </div>
  )
}

export default AllUsers
