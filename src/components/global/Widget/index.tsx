import { ClerkLoading, SignedIn, useUser } from "@clerk/clerk-react"
import { Loader } from "../Loader"
import { useEffect, useState } from "react"
import { fetchUserProfile } from "@/lib/utils"
import { useMediaSources } from "@/hooks/useMediaSources"
import MediaConfiguration from "../MediaConfiguration"
type Props={
    profile:{
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
}
const Widget = ({profile}:Props) => {
    // const [profile,setProfile]=useState<{
    //     status:number
    //     user:({
    //         subscription:{
    //             plan:'PRO' | 'FREE'
    //         } | null
    //         studio:{
    //             id:string
    //             screen:string | null
    //             mic:string | null
    //             preset : 'HD' | 'SD'
    //             camera:string | null
    //             userId: string | null
    //         } | null
    //     }&{
    //         id:string
    //         email:string
    //         firstname:string | null
    //         lastname:string | null
    //         createdAt:Date
    //         clerkid:string
    //     } | null)
    // } |   null>(null)
    // const {user}=useUser()
    // console.log("user->",user)
    // console.log('user->profile',profile)
    
    const {state,fetchMediaResources}=useMediaSources()
    console.log('state->',state)
    
    
    useEffect(()=>{
        if(profile){
            // fetchUserProfile(user.id).then(p=>setProfile(p))
            fetchMediaResources()
        }
    },[profile])
    if (!profile){
        return <></>
    }
    return (
    <div className="p-5">
        {/* <ClerkLoading>
            <div className="h-full flex justify-between items-center">
                
                <Loader/>
            </div>
        </ClerkLoading> */}
        
        {/* <SignedIn> */}
            {profile?<MediaConfiguration state={state} user={profile.user}/>:<div className="w-full h-full flex justify-center items-center">
                <Loader color="#fff"/>
                </div>}
        {/* </SignedIn> */}
    </div>
  )
}

export default Widget