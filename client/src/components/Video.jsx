import React from 'react'
import Menu from './Menu'
import VideoPage from './VideoPage'
import { useSelector } from 'react-redux'

const Video = () => {
    const lightMode = useSelector((state) => state.mode.value)
  return (
    <div className={`flex relative ${ lightMode? "bg-white" : "bg-black"} w-screen`}>
      <Menu />
      <VideoPage />
    </div>
  )
}

export default Video
