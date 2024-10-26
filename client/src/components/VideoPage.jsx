import React from 'react'
import Navbar from './main/Navbar'
import { useParams } from 'react-router-dom'
import VideoContent from './VideoContent';

const VideoPage = () => {
    const params = useParams();
  return (
    <div className='w-full'>
      <Navbar />
      <VideoContent />
    </div>
  )
}

export default VideoPage
