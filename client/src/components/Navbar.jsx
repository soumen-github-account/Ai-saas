import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../contexts/AppContext'
import { MdStars } from "react-icons/md";

const Navbar = () => {
    const navigate = useNavigate()
    const {user} = useContext(AppContext);
    // const {user} = useUser()
    // const { openSignIn } = useClerk()

  return (
    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="" className='w-32 sm:w-44' />
      {
        user ?(
        <div className='flex items-center gap-x-8'>
          <div className='flex text-[17px] items-center gap-x-2 bg-blue-100 text-blue-600 rounded-full py-2 px-4'>
            <MdStars />
            Credits left : {user.balance}
          </div>
          <button className='rounded-full p-1 bg-primary text-white w-10 h-10 cursor-pointer'>{user.email.charAt(0).toUpperCase()}</button> 
        </div>
        )
        :
        (
            <button onClick={()=>navigate('/login')} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>Get started <ArrowRight className='w-4 h-4' /></button>
        )
      }
      {/* <button onClick={()=>navigate('/login')} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>Get started <ArrowRight className='w-4 h-4' /></button> */}
    </div>
  )
}

export default Navbar
