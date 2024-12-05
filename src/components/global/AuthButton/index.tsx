import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Lock, LogIn } from "lucide-react"
import { useState } from "react"
import { Loader } from "../Loader"
import { Link } from "react-router-dom"



type Props={
    user:{
        status:number
        user:({
            subscription:{
                plan:'PRO' | 'FREE'
            } | null
            studio:{
                id:string
                screen:string | null
                mic:string | null
                preset : 'HD' | 'SD'
                camera:string | null
                userId: string | null
            } | null
        }&{
            id:string
            email:string
            firstname:string | null
            lastname:string | null
            createdAt:Date
            clerkid:string
        } | null)
    } | null
    onLogin:(email:string,password:string)=>void,
    loading:boolean
   
}
const AuthButton = ({user,onLogin,loading}:Props) => {
    console.log("user in authbutton->",user)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    
    
    const handleLoginClick=()=>{
       
        onLogin(email,password)
       
    }
    
    if (loading) return <Loader/>
    if(user) return <></>
    return (
        <div className="flex flex-col items-center  gap-y-2">
            <div className='flex gap-x-5 justify-center items-center'>
            <LogIn
                fill="#575655"
                color="#575655"
                size={36}
            />
            <Input  className=" text-white border border-gray-300 rounded-md focus:outline-none"  type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className='flex gap-x-5 justify-center items-center'>
            <Lock
                fill="#575655"
                color="#575655"
                size={36}
            />
            <Input className=" text-white border border-gray-300 rounded-md focus:outline-none" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        

           
           
            <Button  variant={'outline'}  onClick={handleLoginClick}>Login</Button>
            <Link className="text-gray-300 text-sm" to="/forgot-password">Forgot password?</Link>
           
            
            
            
        </div>
  )
}

export default AuthButton