import { SourceDeviceStateProps } from '@/hooks/useMediaSources'
import { useStudioSettings } from '@/hooks/useStudioSettings'
import { Loader } from '../Loader'
import { Headphones, KeyIcon, KeyRoundIcon, Monitor, Settings, Settings2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'


type Props = {
    state:SourceDeviceStateProps,
    user:({
        subscription:{
            plan:'PRO' | 'FREE'
        } | null
        studio:{
            id:string
            screen:string | null
            mic:string | null
            camera:string | null
            preset:'HD' | 'SD'
            userId:string | null
        } | null
    } &{
        id:string
        email:string
        firstname:string | null
        lastname:string | null
        createdAt:Date
        clerkid:string
    })
    | null
}

const MediaConfiguration = ({state,user}: Props) => {
    console.log("state->displays->",state.displays)
    const activeScreen=state.displays?.find((screen)=>screen.id===user?.studio?.screen)
    const activeAudio=state.audioInputs?.find((device)=> device.deviceId===user?.studio?.mic)
    console.log("activescreen->",activeScreen)
    console.log("activesaudios->",activeAudio)
    console.log('user.id->',user!.id)
    
    const {isPending,onPreset,register}=useStudioSettings(
        user!.id,
        user?.studio?.screen || state.displays?.[0]?.id,
        user?.studio?.mic|| state.audioInputs?.[0]?.deviceId,
        user?.studio?.preset,
        user?.subscription?.plan,
        undefined
    )
    return (
   <form className='flex h-full w-full flex-col gap-y-5'>
        {isPending && <div className='fixed w-full top-0 left-0 right-0 bottom-0 rounded-2xl h-full bg-black/80 flex justify-center items-center '>
            <Loader/>
        </div>}
        <div className='flex gap-x-5 justify-center items-center'>
            <Monitor
                fill="#575655"
                color="#575655"
                size={36}
            />
            <select {...register('screen')} className='outline-none cursor-pointer px-5 py-2 rounded-xl border-2 text-white border-[#575655] bg-transparent w-full'>
                {state.displays?.map((display,key)=>(
                    <option selected={activeScreen && activeScreen.id===display.id} value={display.id} className='bg-[#171717] cursor-pointer' key={key}>{display.name}</option>
                ))}
                
            </select>
        </div>
        <div className='flex gap-x-5 justify-center items-center'>
           <Headphones size={36} color="#575655"/>
           <select {...register('audio') }className='outline-none cursor-pointer px-5 py-2 rounded-xl border-2 text-white border-[#575655] bg-transparent w-full' >
           {state.audioInputs?.map((device,key)=>(
                    <option selected={activeAudio && activeAudio.deviceId===device.deviceId} value={device.deviceId} className='bg-[#171717] cursor-pointer' key={key}>{device.label}</option>
                ))}
           </select>
        </div>

        <div className='flex gap-x-5 justify-center items-center'>
          <Settings2 size={36} color="#575655"/>
           <select {...register('preset') }className='outline-none cursor-pointer px-5 py-2 rounded-xl border-2 text-white border-[#575655] bg-transparent w-full' >
           <option disabled={user?.subscription?.plan==='FREE'} selected={onPreset==='HD' || user?.studio?.preset==='HD'} value={'HD'} className='bg-[#171717] cursor-pointer'>
            1080p{' '}
            {user?.subscription?.plan==='FREE' && '(Upgrade to PRO plan)'}
           </option>
           <option value={'SD'} selected={onPreset==='SD' || user?.studio?.preset==='SD'} className='bg-[#171717] cursor-pointer'>
            720p
           </option>
           </select>
        </div>
        <div title="Enter your API key below to generate the title, description, and transcript" className='flex gap-x-5 justify-center items-center '>
            <KeyIcon   color="#575655" size={36} />
            <Input {...register('api_key')}  className='outline-none cursor-pointer px-5 py-2 rounded-xl border-2 text-white border-[#575655] bg-transparent w-full' type="text"/>
        </div>
   </form>
  )
}

export default MediaConfiguration