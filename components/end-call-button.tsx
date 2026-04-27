import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const EndCallButton = () => {
    const call = useCall();
    const router = useRouter();
  const [isEnding, setIsEnding] = useState(false);

    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    const isMeetingHost = localParticipant && call?.state.createdBy && localParticipant.userId == call?.state.createdBy.id;

    if (!isMeetingHost) return null

  return (
    <Button disabled={isEnding} onClick={async () => {
      try {
        setIsEnding(true);
        await call.endCall();
      } catch (error) {
        console.error(error);
        toast('Could not end the call cleanly. Returning home.');
      } finally {
        router.push('/');
        setIsEnding(false);
      }
    }} className='bg-red-500 '>
        End call for everyone
    </Button>
  )
}

export default EndCallButton