import axios from "axios"


export const getUserProfile=async()=>{
    const token=localStorage.getItem('token')
   
    
    try{
        const res=await axios.post(`${import.meta.env.VITE_HOST_URL}/electron/userprofile`,{token:token})
        return res.data
    }catch(error){
        console.log("Faied to fetch user",error)
        return null
    }   
}

export const login=async(email:string,password:string)=>{
    const res=await axios.post(`${import.meta.env.VITE_HOST_URL}/electron/login`,{email,password})
    if (res.data.status===200){
        const token=res.data.token
        localStorage.setItem('token',token)
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    return res.data
}

export const logout=()=>{
    localStorage.removeItem('token')
    
}

export const sendEmail=async (email:string | null)=>{
    const res=await axios.post(`${import.meta.env.VITE_HOST_URL}/electron/forgotPassword`,{
        email:email
    })
    return res.data
}


