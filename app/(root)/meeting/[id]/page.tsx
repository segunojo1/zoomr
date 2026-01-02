import React from 'react'

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const {id} = await params;
  return (
    <div>meeting: {id}</div>
  )
}
