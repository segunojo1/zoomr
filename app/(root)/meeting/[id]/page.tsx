'use client';

import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const {id} = await params;
    const {user, isLoaded} = useUser();
    const [isSetupComplete, setIsSetupComplete] = useState(false);
  return (
    <main className='h-screen w-full'>
      <StreamCall>
        <StreamTheme>
          {!isSetupComplete ? (
            <p>meeting setup</p>
          ) : (
            <div>
              <p>meeting room</p>
            </div>
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}
