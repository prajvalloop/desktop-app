import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'
import './App.css'
import { toast, Toaster } from 'sonner'
import ControlLayer from './layouts/ControlLayer'
import AuthButton from './components/global/AuthButton'
import Widget from './components/global/Widget'
import { useEffect, useState } from 'react'
import { getUserProfile, login, logout } from './lib/auth'
import { HashRouter, Route, Routes } from 'react-router-dom'; // Import React Router
import ForgotPassword from './components/global/ForgotPassword'

const client=new QueryClient()
function App() {
  const [user,setUser]=useState<{
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
} | null>(null)
  const [loading,setLoading]=useState(false)
  console.log("user->",user)
  useEffect(()=>{
    const fetchProfile=async()=>{
      const profile=await getUserProfile()
      if (profile.status===200){
        console.log('profile->in useeffect',profile)
        setUser(profile)
      }
      
    }
    fetchProfile()
  },[])
  const handleLogin=async(email:string,password:string)=>{
    setLoading(true)
    const res=await login(email,password)
    console.log("res handle_login->",res)
   
    if (res.status===200){
    
    const profile=await getUserProfile()
    console.log("profile->",profile)
    setUser(profile)
  }
  setLoading(false)
  
  toast(res.status===200?'Success':'Falied',{
    description:res.data
})
  }
  const handleLogout=()=>{
    logout()
    setUser(null)
    toast('Success',{
      description:'Logout'
    })
  }
  return (
    <QueryClientProvider client={client}>
      <ControlLayer onLogout={handleLogout} user={user}>
        <AuthButton user={user} onLogin={handleLogin} loading={loading} />
        <Widget profile={user}/>
       
      </ControlLayer>
      
    </QueryClientProvider>
  )
}

export default App
