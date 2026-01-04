"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";

export const tokenProvider = async () => {
  const res = await fetch("/api/stream-token");
  if (!res.ok) throw new Error("Failed to fetch token");
  const { token } = await res.json();
  return token;
};

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
  if (!isLoaded || !user || !API_KEY) return;

  const client = new StreamVideoClient({ apiKey: API_KEY });
  let active = true;

  (async () => {
    try {
      await client.connectUser(
        { id: user.id, name: user.username || user.id, image: user.imageUrl },
        tokenProvider
      );
      if (active) setVideoClient(client);
    } catch (e) {
      console.error('Failed to connect user', e);
    }
  })();

  return () => {
    active = false;
    client.disconnectUser?.();
  };
}, [user, isLoaded]);

  if (!videoClient)
    return (
      <div>
        <p className="bg-[red] w-[500px] h-[500px]">Loadin...</p>
      </div>
    );

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
