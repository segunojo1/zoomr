'use client'
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { toast } from 'sonner';

const MeetingSetup = ({setIsSetupComplete}: {setIsSetupComplete: (value: boolean) => void}) => {
    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
    const [isJoining, setIsJoining] = useState(false);

    const call = useCall();

    if (!call) {
        return <div className='flex h-screen w-full items-center justify-center text-white'>Loading...</div>;
    }

    useEffect(() => {
        if (isMicCamToggledOn) {
            call?.camera.disable();
            call?.microphone.disable();
        } else {
            call?.camera.enable();
            call?.microphone.enable();
        }

    }, [isMicCamToggledOn, call?.camera, call?.microphone])
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
        <h1 className='text-2xl font-bold'>Setup</h1>
        <VideoPreview />
        <div className='flex h-16 items-center justify-center'>
            <label htmlFor="" className='flex items-center justify-center gap-2 font-medium '>
                <input type="checkbox" checked={isMicCamToggledOn} onChange={(e) => setIsMicCamToggledOn(e.target.checked)} name="" id="" />
                Join with mic and camera off
            </label>
            <DeviceSettings />
            <Button className='rounded-md bg-green-500 px-4 py-2.5 ' disabled={isJoining} onClick={async () => {
                try {
                    setIsJoining(true);
                    await call.join();
                    setIsSetupComplete(true);
                } catch (error) {
                    console.error(error);
                    toast('Could not join the meeting. Please try again.');
                } finally {
                    setIsJoining(false);
                }
            }}>
                Join Meeting
            </Button>
        </div>
    </div>
  )
}

export default MeetingSetup