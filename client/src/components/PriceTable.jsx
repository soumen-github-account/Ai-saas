import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const PriceTable = () => {
    const { user, backendUrl } = useContext(AppContext)
    const navigate = useNavigate()

    const initPay = async(order)=>{
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Credits Payment',
            Description: 'Credit Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async(response)=>{
                console.log(response)
                try {
                    const {data} = await axios.post(backendUrl + '/api/user/verify-razorpay', response, {withCredentials: true})
                    if(data.success){
                        navigate('/');
                        toast.success('Credit Added')
                    } else{
                        toast.error(data.message)
                    }
                } catch (error) {
                    toast.error(error.message);
                }
            }
        }

        const rzp = new window.Razorpay(options);
        rzp.open()
    }

    const paymentRazorpay = async(planId) =>{
        
        try {
            console.log("hello")
            if(!user){
                navigate('/login')
            }
            const {data} = await axios.post(backendUrl + '/api/user/pay-razorpay',{planId} ,{withCredentials: true})
            if(data.success){
                initPay(data.order)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const tost = async()=>{
        toast.error("Disabled for demo");
    }

    return (
        <div className="flex flex-wrap items-center justify-center gap-6">
            {/* Free Plan */}
            <div className="w-72 bg-white text-center text-gray-800/80 border border-gray-500/30 p-6 pb-16 rounded-lg">
                <p className="font-semibold">Free</p>
                <h1 className="text-3xl font-semibold">₹ 0<span className="text-gray-500 text-sm font-normal"> / 5 credits</span></h1>
                <ul className="list-none text-gray-500 text-sm mt-6 space-y-1">
                    {["Access to all basic", "Article Generation", "5 credits for image generate", "Resume Review", "Title Generation"].map(item => (
                        <li key={item} className="flex items-center gap-2">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1" />
                            </svg>
                            <p>{item}</p>
                        </li>
                    ))}
                </ul>
                <button type="button" disabled className="bg-gray-50 text-sm w-full py-2 rounded text-gray-700 font-medium mt-7 transition-all">
                    Get Started
                </button>
            </div>

            {/* Premium Plan */}
            <div className="w-72 bg-primary relative text-center text-white border border-gray-500/30 p-6 pb-14 rounded-lg">
                <p className="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-[#8789FB] rounded-full">Most Popular</p>
                <p className="font-semibold pt-2">Premium</p>
                <h1 className="text-3xl font-semibold">₹ 199<span className="text-sm font-normal"> / 500 credits</span></h1>
                <ul className="list-none text-white text-sm mt-6 space-y-1">
                    {["Title Generation", "Article Generation", "Generate Images", "Remove Background", "Remove Objects", "Resume Review"].map(item => (
                        <li key={item} className="flex items-center gap-2">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor" />
                            </svg>
                            <p>{item}</p>
                        </li>
                    ))}
                </ul>
                {/* paymentRazorpay("Premium") */}
                <button
                    onClick={() =>{user ? tost() : navigate('/login')}}
                    type="button"
                    className="bg-white text-sm w-full cursor-pointer py-2 rounded text-primary font-medium mt-7 hover:bg-gray-200 transition-all"
                >
                    {user ? "Purchase" : "Get Started"}
                </button>
            </div>

            {/* Advanced Plan */}
            <div className="w-72 bg-white text-center text-gray-800/80 border border-gray-500/30 p-6 rounded-lg">
                <p className="font-semibold">Advanced</p>
                <h1 className="text-3xl font-semibold">₹ 79<span className="text-gray-500 text-sm font-normal"> / 100 credits</span></h1>
                <ul className="list-none text-gray-500 text-sm mt-6 space-y-1">
                    {["Title Generation", "Article Generation", "Generate Images", "Remove Background", "Remove Objects", "Resume Review"].map(item => (
                        <li key={item} className="flex items-center gap-2">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1" />
                            </svg>
                            <p>{item}</p>
                        </li>
                    ))}
                </ul>
                {/* paymentRazorpay("Advanced") */}
                <button
                    onClick={() =>{user ? tost() : navigate('/login')}}
                    type="button"
                    className="bg-primary cursor-pointer text-sm w-full py-2 rounded text-white font-medium mt-7 hover:bg-indigo-600 transition-all"
                >
                    {user ? "Purchase" : "Get Started"}
                </button>
            </div>
        </div>
    )
}

export default PriceTable
