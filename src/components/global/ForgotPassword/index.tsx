import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { sendEmail } from '@/lib/auth'
import { MailCheckIcon, MailIcon} from 'lucide-react'
import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { toast } from 'sonner'

type Props = {}

const ForgotPassword = (props: Props) => {
    const [email,setEmail]=useState<string | null>(null)
   
    const handleforgotPassword= async()=>{
        const res=await sendEmail(email)
        toast(res.status===200?'Success':'Falied',{
            description:res.data
        })
  }
    return (
    <div className=" h-[440px]  flex items-center  ">
    <div className='w-full flex flex-col items-center gap-y-2'>
<div className='flex gap-x-5 justify-center items-center'>
    <MailCheckIcon
        fill="#575655"
        color="#575655"
        size={36}
    />
    <Input className=" text-white border border-gray-300 rounded-md focus:outline-none" type="text" placeholder="Email"  onChange={(e:any)=>setEmail(e.target.value)} />
</div>


   
   
    <Button variant={'outline'}  onClick={handleforgotPassword}>Check Email</Button>
    <Link className='text-gray-300 text-sm' to="/">Back to Login ?</Link>
   
    
    
    </div>
</div>
  )
}

export default ForgotPassword