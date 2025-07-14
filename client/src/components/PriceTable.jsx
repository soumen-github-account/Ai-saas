import React, { useContext } from 'react'
import { AppContext } from '../contexts/appContext'
import { useNavigate } from 'react-router-dom'

const PriceTable = () => {
    const {user} = useContext(AppContext)
    const navigate = useNavigate();


    
  return (
    <div class="flex flex-wrap items-center justify-center gap-6">
        <div class="w-72 bg-white text-center text-gray-800/80 border border-gray-500/30 p-6 pb-16 rounded-lg">
            <p class="font-semibold">Free</p>
            <h1 class="text-3xl font-semibold">$0<span class="text-gray-500 text-sm font-normal">/5 creadits</span></h1>
            <ul class="list-none text-gray-500 text-sm mt-6 space-y-1">
                <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                    </svg>
                    <p>Access to all basic</p>
                </li>
                <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                    </svg>
                    <p>Article Generation</p>
                </li>
                <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                    </svg>
                    <p>5 creadits for image generate</p>
                </li>
                <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                    </svg>
                    <p>Resume Review</p>
                </li>
                <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                    </svg>
                    <p>Title Generation</p>
                </li>
            </ul>
            <button type="button" disabled='true' class="bg-gray-50 text-sm w-full py-2 rounded text-gray-700 font-medium mt-7 transition-all">
                Start with free
            </button>
        </div>

        <div class="w-72 bg-primary relative text-center text-white border border-gray-500/30 p-6 pb-14 rounded-lg">
            <p class="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-[#8789FB] rounded-full">Most Popular</p>
            <p class="font-semibold pt-2">Premium</p>
            <h1 class="text-3xl font-semibold">$199<span class="text-sm font-normal">/500 creadits</span></h1>
            <ul class="list-none text-white text-sm mt-6 space-y-1">
                {/* <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                    </svg>
                    <p>500 creadits for image generate</p>
                </li> */}
                <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                    </svg>
                    <p>Title Generation</p>
                </li>
                <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                    </svg>
                    <p>Article Generation</p>
                </li>
                <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                    </svg>
                    <p>Generate Images</p>
                </li>
                <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                    </svg>
                    <p>Remove Background</p>
                </li>
                <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                    </svg>
                    <p>Remove Objects</p>
                </li>
                <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                    </svg>
                    <p>Resume Review</p>
                </li>
            </ul>
            <button onClick={()=> {!user ? navigate('/login') : navigate('/ai')}} type="button" class="bg-white text-sm w-full cursor-pointer py-2 rounded text-primary font-medium mt-7 hover:bg-gray-200 transition-all">
                ${ user ? "Purchase" : 'Start with free'}
            </button>
        </div>

        <div class="w-72 bg-white text-center text-gray-800/80 border border-gray-500/30 p-6 rounded-lg">
            <p class="font-semibold">Advanced</p>
            <h1 class="text-3xl font-semibold">$79<span class="text-gray-500 text-sm font-normal">/100 creadits</span></h1>
            <ul class="list-none text-gray-500 text-sm mt-6 space-y-1">
                {/* <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                    </svg>
                    <p>100 creadits for image generate</p>
                </li> */}
                <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                    </svg>
                    <p>Title Generation</p>
                </li>
                <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                    </svg>
                    <p>Article Generation</p>
                </li>
                <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                    </svg>
                    <p>Generate Images</p>
                </li>
                <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                    </svg>
                    <p>Remove Background</p>
                </li>
                <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                    </svg>
                    <p>Remove Objects</p>
                </li>
                <li class="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                    </svg>
                    <p>Resume Review</p>
                </li>
            </ul>
            <button type="button" class="bg-primary cursor-pointer text-sm w-full py-2 rounded text-white font-medium mt-7 hover:bg-indigo-600 transition-all">
                ${ user ? "Purchase" : 'Start with free'}
            </button>
        </div>
    </div>
  )
}

export default PriceTable
