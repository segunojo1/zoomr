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
    const { user, isLoaded } = useUser();
    const [isSetupComplete, setIsSetupComplete] = useState(false);

    const { call, isCallLoading } = useGetCallById(id);

    if (!isLoaded || isCallLoading) return <div>Loading...</div>;
  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup />
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