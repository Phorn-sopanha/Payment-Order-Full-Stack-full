import React, {useContext, useState} from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {  Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [data,setData] = useState({
        email : "",
        password: "",
    })

    const navigate = useNavigate()
    const { fetchUserDetails , fetchUserAddToCart } = useContext(Context)

    const handleOnchange = (e) =>{
        const {name , value } = e.target
        setData((preve)=>{
            return{
                ...preve,
                [name]: value
            }
        })

    }

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()  
            fetchUserAddToCart()
        }
        if(dataApi.error){
            toast.error(dataApi.message)
        }

    }
    console.log('data lgoin',data)

  return (
    <section id='login'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-4 w-full max-w-sm mx-auto'>
                <div className='w-20 h-20 mx-auto'>
                    <img src={loginIcon} alt='login-icon' />
                </div>

                <form className='pt-6 flex flex-col gap-2'onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Email :</label>
                        <div className='bg-slate-100 p-2'>
                            <input 
                            type='email' 
                            name='email'
                            value={data.email}
                            onChange={handleOnchange}
                            placeholder='Enter email' 
                            className='w-full h-full outline-none bg-transparent' />
                        </div>
                    </div>
                    <div>
                        <label>Password :</label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                            type={showPassword ? "text" : "password"} 
                            name='password'
                            value={data.password}
                            onChange={handleOnchange}
                            placeholder='Enter password' 
                            className='w-full h-full outline-none  bg-transparent'/>
                            <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve=>!preve))}>
                                <span>
                                    {
                                        showPassword ? (
                                            <FaEyeSlash />
                                        )
                                        :
                                        (
                                            <FaEye />
                                        )
                                    } 
                                </span>
                            </div>
                        </div>
                        <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-500'>
                            Forgot password ?
                        </Link>
                    </div>
                    <button className='bg-gray-500 hover:bg-gray-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Login</button>
                </form>
                <p className='my-5 text-center'>Don't have account ? <Link to={'/sign-up'} className='text-red-500 hover:text-red-700 hover:underline'>Sign up</Link></p>
            </div>

        </div>
    </section>
  )
}

export default Login
