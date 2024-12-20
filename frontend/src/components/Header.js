import React, { useContext, useState } from 'react';
// import Logo from './Logo'
import Logo from '../assest/logo.png'
import { IoMdSearch } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import {  Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {

  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  // console.log("user header",user)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)

  const searchQuery = URLSearch.getAll("q")

  const [search,setSearch] = useState(searchQuery)

  // console.log("search__input",searchInput?.search.split("=")[1])

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })
    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }
    if(data.error){
      toast.error(data.error)
    }
  }

  const handleSearch = (e) =>{
    const { value } = e.target

    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  
  }
  // console.log("addtocart count ",context)
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
            {/* <Logo w={90} h={50} /> */}
            <img className='w-40' src={Logo}  alt='header-logo'/>
          </Link>
        </div>

        <div className=' hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-3'>
          <input tyle="text" placeholder='search product here..' className='w-full outline-none' onChange={handleSearch} value={search}/>
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full'>
            <IoMdSearch />
          </div>
          
        </div>

        <div className='flex items-center gap-7'>
        <div className='relative group flex justify-center' onClick={() =>setMenuDisplay(preve =>!preve)}>
          {
            user?._id && (
              <div className='text-3xl cursor-pointer relative flex justify-center' >
                {
                  user?.profilePic ? (
                    <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                  ) : (
                    <FaRegUserCircle/>
                  )
                }
              </div>
            )
          }
          
          {
            menuDisplay && (
              <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                <nav>
                {
                  user?.role === ROLE.ADMIN && (
                    <Link to={"admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' >Admin panel</Link>
                  )
                }
                <Link to={'/order'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'>Order</Link>
                </nav>               
              </div>
            )
          }
        </div>
          
                {
                  user?._id && (
                    <Link to={"/Cart"} className='text-2xl relative'>
                      <span><FaCartShopping /></span>
                      <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                          <p className='text-sm'>{context.cartProductCount}</p>
                      </div>
                    </Link>
                  )
                }
          <div>
            {
              user?._id ?(
                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
              )
              :
              (
                <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>login</Link>
              )
            }
            
          </div>
        </div>
        
      </div>
    </header>
  )
}

export default Header
