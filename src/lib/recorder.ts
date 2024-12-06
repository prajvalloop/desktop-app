import React from "react";
import { hidePluginWindow } from "./utils";
import { v4 as uuid } from "uuid";
import io from "socket.io-client";

let videoTransferFileName: string | undefined;
let mediaRecorder: MediaRecorder;
let userId: string;
let API_KEY:string | null | undefined;
const socket = io(import.meta.env.VITE_SOCKET_URL as string);


export const StartRecording = (onSources: { screen: string, audio: string, id: string, api_key:string | null | undefined }) => {
  
  hidePluginWindow(true);
  videoTransferFileName = `${uuid()}-${onSources.id.slice(0, 8)}.webm`;
  API_KEY=onSources.api_key
  mediaRecorder.start(1000);
  
};

export const onStopRecording = () => mediaRecorder.stop();

export const onDataAvaliable = (e: BlobEvent) => {
  socket.emit("video-chunks", {
    chunks: e.data,
    filename: videoTransferFileName,
  });
};

const stopRecording = () => {
  hidePluginWindow(false);
  socket.emit("process-video", {
    filename: videoTransferFileName,
    userId,
    API_KEY
  });
};

export const selectSources = async (
   onSources: { screen: string; audio: string; id: string; preset: "HD" | "SD",api_key?:string | null },
   videoElement: React.RefObject<HTMLVideoElement>
 ) => {
   console.log("fired");
 
   try {
     if (onSources && onSources.screen && onSources.id) {
       // Screen capture constraints
       const screenConstraints: MediaStreamConstraints = {
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: onSources.screen,
            minWidth:onSources.preset==='HD' ? 1920:1280,
            maxWidth:onSources.preset==='HD'?1920:1280,



            minHeight:onSources.preset==='HD'?1080:720,
            maxHeight:onSources.preset==='HD'?1080:720,
            frameRate:30
          },
        } as MediaTrackConstraints,
      };

      
 
       console.log("screenConstraints->", screenConstraints);
       userId = onSources.id;
 
       // Capture screen stream using getDisplayMedia
       const stream = await navigator.mediaDevices.getUserMedia(screenConstraints);
 
       // Capture audio stream (microphone)
       
       
        const audioStream = await navigator.mediaDevices.getUserMedia({
           audio: { deviceId: { exact: onSources.audio } },
           video: false,
         })
 
         // Combine screen and audio streams
        
       
 
       console.log("videoElement->", videoElement);
 
       // Attach the screen stream to the video element for preview
       if (videoElement && videoElement.current) {
         videoElement.current.srcObject =stream
        await videoElement.current.play()
       }
 
       // Initialize MediaRecorder for combined stream
       const combinedStream=new MediaStream([...stream.getTracks(),...audioStream.getTracks()])
      
       mediaRecorder = new MediaRecorder(combinedStream,{
        mimeType:'video/webm; codecs=vp9'}
       );
 
       mediaRecorder.ondataavailable = onDataAvaliable;
       mediaRecorder.onstop = stopRecording;
     }
   } catch (error) {
     console.error("Error accessing media devices:", error);
   }
 };
 
 
