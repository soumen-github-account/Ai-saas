import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export const AppContext = createContext();

const AppContextProvider = (props) =>{

    const [user,setUser] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getUserData = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/get-user', {withCredentials: true})
            if(data.success){
                setUser(data.userData);
            } else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getUserData();
    },[])

    const value = {
        backendUrl, user , getUserData
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;