'use client';

import MeetingSetup from '@/components/meeting-setup';
import MeetingRoom from '@/components/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'

const MeetingPage = () => {
    const { id }: any = useParams();
    const { isLoaded } = useUser();
    const [isSetupComplete, setIsSetupComplete] = useState(false);

    const { call, isCallLoading } = useGetCallById(id);

    if (!isLoaded || isCallLoading) return <div>Loading...</div>;
    if (!call) {
      return (
        <main className='flex h-screen w-full items-center justify-center px-6 text-white'>
          <div className='max-w-md text-center'>
            <h1 className='text-2xl font-bold'>Meeting not found</h1>
            <p className='mt-2 text-sm text-gray-300'>The meeting link may be invalid, expired, or you may not have access yet.</p>
          </div>
        </main>
      );
    }
  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <div>
              <MeetingRoom />
            </div>
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default MeetingPage;