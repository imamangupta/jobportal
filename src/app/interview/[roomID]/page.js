"use client"; // Ensure the component runs on the client side

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Next.js hook to get URL search parameters
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const InterviewRoom = () => {
  const containerRef = useRef(null); // Reference for the video call container
  const searchParams = useSearchParams();
  const [roomID, setRoomID] = useState(""); // State to manage the roomID
  const router = useRouter(); // Router instance to handle navigation
  useEffect(() => {
    // Function to safely access roomID from URL or generate a random one
    const initializeRoomID = () => {
      // Ensure code only runs on the client side
      if (typeof window !== "undefined") {
        // Fetch the roomID from the URL if present, otherwise generate a random one
        const urlParams = new URLSearchParams(window.location.search);
        const urlRoomID = urlParams.get("roomID") || Math.floor(Math.random() * 10000).toString();
        setRoomID(urlRoomID);
      }
    };

    initializeRoomID();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && roomID && containerRef.current) {
      // Initialize participant details
      const userID = Math.floor(Math.random() * 10000).toString();
      const userName = "userName" + userID;
      const appID = 528486919;
      const serverSecret = "df4ec1fb3f0638334c7f53008d8b58e4";
      
      // Generate the token for the video call
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

      // Create the ZegoUIKit instance and join the room
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: containerRef.current,
        sharedLinks: [
          {
            name: "Personal link",
            url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
    }
  }, [roomID]);

  const handleGoBack = () => {
    router.push("/dashboard"); // Navigate back to the previous page
  };

  return (
    <div className="video-call-container" style={{ height: "100vh", width: "100vw" }}>
      <div ref={containerRef} className="h-full w-full">
        
      </div>
      <button
        onClick={handleGoBack}
        className="absolute bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >Home</button>
    </div>

  );
};

export default InterviewRoom;
