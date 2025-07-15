import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
// import { AppContext } from '../contexts/appContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext'


const Login = () => {
    const navigate = useNavigate()
    const [state,setState] = useState("signup")
    const { backendUrl } = useContext(AppContext)
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    

    const onSubmitHandler = async(event)=>{
        event.preventDefault();
        try {
            if(state == 'signup'){
                const {data} = await axios.post(backendUrl + '/api/auth/register', {name:username,email,password}, {headers:{'Content-Type':"application/json"}, withCredentials:true})
            if(data.success){
                // toast.success(data.message)
                setUsername('');
                setEmail('');
                setPassword('');
                navigate('/')
            } else{
                toast.error(data.message)
            }
            } else{
                const {data} = await axios.post(backendUrl + '/api/auth/login', {email,password}, {headers:{'Content-Type':"application/json"}, withCredentials:true})
            if(data.success){
                // toast.success(data.message)
                setUsername('');
                setEmail('');
                setPassword('');
                navigate('/')
            } else{
                toast.error(data.message)
            }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <div className='flex items-center h-screen justify-center'>
    <form onSubmit={onSubmitHandler} className='shadow-lg flex flex-col gap-5 p-8'>
        <div className='my-4 flex flex-col items-center'>
            {/* <h1 className='text-center font-bold text-xl'>Instagram</h1> */}
            <img className='w-35' src={assets.logo} alt="" />
            <p className='text-sm text-center'>You can use many ai tools like - image generate, background remove etc.</p>
        </div>
        {
            state == "signup" ? 
            <div>
            <span className='font-medium'>Full Name</span>
            <input
                type="text"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                className="w-full outline-1 outline-gray-300  shadow-sm pl-3 h-8 mt-1 rounded-sm"
            />
            </div>
            : null
        }

        <div>
            <span className='font-medium'>Email</span>
            <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full outline-1 outline-gray-300  shadow-sm pl-3 h-8 mt-1 rounded-sm"
            />
        </div>
        <div>
            <span className='font-medium'>Password</span>
            <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full outline-1 outline-gray-300  shadow-sm pl-3 h-8 mt-1 rounded-sm"
            />
        </div>
        <div className='w-full flex items-center justify-center'>
            <button type='submit' className='bg-primary text-gray-100 py-2 px-4 cursor-pointer rounded-sm'>{state=="signup"? "Sign Up" : "Login"}</button>
        </div>
        
        <span className='text-center flex justify-between'>{state=="signup" ? "Already have an account?":"create a new account"} 
            {
                state == "signup" ?
                <p onClick={()=>setState("login")} className='text-blue-600 cursor-pointer underline'>Login</p>
                :
                <p onClick={()=>setState("signup")} className='text-blue-600 cursor-pointer underline'>Sign Up</p>
            }
            
            </span>
    </form>
    </div>
  )
}

export default Login
