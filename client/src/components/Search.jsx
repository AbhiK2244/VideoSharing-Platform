import React, { useEffect, useState } from 'react'
import Navbar from './main/Navbar'
import { useSelector } from 'react-redux'
import VideoPage from './VideoPage'
import Menu from './Menu'
import axios from 'axios'
import serverUrl from '../../serverUrl.js'
import { useLocation } from 'react-router-dom'
import Card from './main/Card'

const Search = () => {
    const lightMode = useSelector((state) => state.mode.value)

    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(false);

    //search: "?q=hello"
    const query = useLocation().search;
    console.log("q: ", query)

    useEffect(() => {
        const fetchVideos = async () => {
            try{
                const res = await axios.get(`${serverUrl}/videos/search${query}`)
                console.log("search videos", res.data)
                setVideos(res.data)
                if(res.data.length == 0)
                {
                    setError(true);
                }
            }
            catch(err)
            {
                console.log("Search Page Error:", err)
                setError(true);
            }
        }

        fetchVideos()
    }, [query])
  return (
    <div className={`flex relative ${ lightMode? "bg-white text-black" : "bg-black text-white"} w-screen`}>
    { (videos.length === 0) && error && <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>No videos Found</div> }  
      <Menu />
      <div className='w-full'>
        <Navbar /> 
        <div className={`w-full flex flex-col gap-3 mt-1  h-[90vh] overflow-y-auto`}>
            {videos.map((video) => <Card type={"rec"} h={true} key={video._id} video={video}/>)}
        </div>
    </div>
    </div>
  )
}

export default Search
