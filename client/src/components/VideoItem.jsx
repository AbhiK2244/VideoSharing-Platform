import axios from 'axios'
import React, { useEffect } from 'react'
import serverUrl from '../../serverUrl.js'
import { useDispatch } from 'react-redux'
import { view } from '../redux/video/videoSlice.js'

const VideoItem = ({src, videoId}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const updateView = async () => {
      try{
        const res = await axios.put(`${serverUrl}/videos/view/${videoId}`)
        dispatch(view())
        console.log(res.data);
      }
      catch(err)
      {
        console.log("view Error:", err)
      }
    }
    updateView();
  },[src]);
  
  return (
    <video className='h-full w-full object-cover mt-3' controls autoPlay src={src}></video>
  )
}

export default VideoItem
