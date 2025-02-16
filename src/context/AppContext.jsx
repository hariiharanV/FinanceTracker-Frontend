import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {useLocation} from 'react-router-dom'
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props)=>{

    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const location = useLocation(); 
    const [isLoggedIn,setIsLoggedIn] = useState(() => {
        return sessionStorage.getItem("isLoggedIn") === "true";
    });
    const [userData,setUserData] = useState(false);
    const [isChartEmpty,setIsChartEmpty] = useState(false);

    //axios.defaults.withCredentials = true;

    const getAuthState = async()=>{
        try{
                const {data} = await axios.get(backendURL +'/api/auth/is-auth',{withCredentials: true});

                if(data.success)
                {
                   // setIsLoggedIn(true);
                   sessionStorage.setItem("isLoggedIn", "true");
                    getUserData();
                }else{
                    sessionStorage.removeItem("isLoggedIn");
                }
        }catch(error)
        {
            toast.error(error.message);
            localStorage.removeItem("isLoggedIn");
        }
    }

    const getUserData = async()=>{
            try{
                const {data} = await axios.get(backendURL + '/api/user/data',{withCredentials: true})

                data.success ? setUserData(data.userData) : toast.error(data.message)
            }catch(error)
            {
                toast.error(error.message)
            }   
    }

    useEffect(()=>{

        getAuthState();
        console.log("Calling AuthState")
    },[])

    useEffect(() => {
        getAuthState();
      }, [location.pathname]); 

    useEffect(()=>{

        console.log(isLoggedIn)

    },[isLoggedIn])

    const value = {
        backendURL,
        isLoggedIn,setIsLoggedIn,
        userData,setUserData,
        getUserData,isChartEmpty,setIsChartEmpty
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}