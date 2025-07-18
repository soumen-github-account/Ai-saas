import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();

const AppContextProvider = (props) =>{

    const [user,setUser] = useState(false);
    const navigate = useNavigate()
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const getUserData = async () => {
    try {
        const { data } = await axios.get(backendUrl + '/api/user/get-user', {
        withCredentials: true,
        });

        if (data.success) {
        setUser(data.userData);
        } else {
        setUser(false); // ✅ Clear user on failure
        // Optionally show toast if you want
        }
    } catch (error) {
        setUser(false); // ✅ Clear user on error
        // toast.error(error.message); // optional
    }
    };


    const logOut = async()=>{
        try {
            const {data} = await axios.post(backendUrl + '/api/auth/logout',{}, {withCredentials:true})
            if(data.success){
                setUser(false);
                navigate('/')
                toast.success(data.message)
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
            // Not logged in — don't show a toast, just silently ignore
            setUser(false);
            } else {
                toast.error(error.message || "An error occurred while fetching user data.");
            }
        }
    }

    useEffect(()=>{
        getUserData();
    },[]);

    const value = {
        backendUrl, user , getUserData, logOut
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;