import Image from 'next/image'
import React from 'react'

const MeetingCard = () => {
  return (
    <div className='px-6 py-8 bg-[#1C1F2E]'>
        <div>
            <Image src='/icons/upcoming.svg' alt='image' />
            <h2 className='text-2xl/[140%]'>Team Sync: Sprint Planning & Updates</h2>
            <p className='text-[16px]/[140%]'>March 15, 2024 -</p>
        </div>
    </div>
  )
}

export default MeetingCard