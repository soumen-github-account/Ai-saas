import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, LogOut } from 'lucide-react'
import { AppContext } from '../contexts/AppContext'
import { MdStars } from "react-icons/md";
import { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useEffect } from 'react'

const Navbar = () => {
    const navigate = useNavigate()
    const {user, logOut} = useContext(AppContext);
    const [open, setOpen] = useState(false)

    useEffect(() => {
      const handleScroll = () => {
          if (open) setOpen(false)
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [open])

  return (
    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="" className='w-28 sm:w-44' />
      {
        user ?(
        <div className='flex items-center md:gap-x-8 gap-x-3'>
          <div className='flex md:text-[17px] text-[14px] items-center gap-x-2 bg-blue-100 text-blue-600 rounded-full py-2 md:px-4 px-3'>
            <MdStars />
            Credits left : {user.balance}
          </div>
          <button onClick={()=>setOpen(true)} className='rounded-full p-1 bg-primary text-white w-10 h-10 cursor-pointer'>{user.email.charAt(0).toUpperCase()}</button> 
        </div>
        )
        :
        (
            <button onClick={()=>navigate('/login')} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>Get started <ArrowRight className='w-4 h-4' /></button>
        )
      }
      {/* <button onClick={()=>navigate('/login')} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>Get started <ArrowRight className='w-4 h-4' /></button> */}
      {
        open ? 
        <div className='absolute right-30 max-sm:right-10 top-20 min-w-50 bg-gray-50 shadow-md max-h-60 p-3'>
          <RxCross2 onClick={()=>setOpen(false)} className='text-[24px] text-gray-500 font-bold absolute right-2 top-2 cursor-pointer hover:text-gray-600' />
          <div className='flex items-center gap-x-4 pr-30'>
            <div className='rounded-full flex items-center justify-center bg-primary text-white w-10 h-10 cursor-pointer'>{user?.email?.charAt(0).toUpperCase()}</div> 
            <span>
              <p className='text-[15px] text-gray-800'>{user.name}</p>
              <p className='text[14px] text-gray-700'>{user.email}</p>
            </span>
            
          </div>
          <button onClick={()=>{logOut(); setOpen(false)}} className='flex gap-x-10 text-gray-500 hover:text-gray-700 cursor-pointer border-t-1 border-t-gray-300 w-full mt-2 py-2'>
            <LogOut className='w-4.5 transition cursor-pointer'/>
            <p>Sign out</p>
          </button>
        </div>
        :
        null
      }
    </div>
  )
}

export default Navbar
