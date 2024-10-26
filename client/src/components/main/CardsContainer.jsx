import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios';
import serverUrl from '../../../serverUrl.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CardsContainer = ({type}) => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const lightMode = useSelector(state => state.mode.value);

  useEffect (() => {
    const fetchVideos = async () => {
      try{
        const res = await axios.get(`${serverUrl}/videos/${type}`, {
          withCredentials: true
      });
        const data = await res.data;
        setVideos(data);
        // console.log("data response is: ", data);
      }
      catch(err){
        console.log("Error: ", err.response);
        if(err.response.status === 500)
          setError(true);
      }
    }

    fetchVideos()
  }, [type])

  return (
    <div className='w-full border-l h-[87vh]'>
      { (videos.length === 0) && error && <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${ lightMode? " text-black" : " text-white"}`}>Internal Server Error. Please refresh</div> }
      <div className='overflow-y-scroll h-full transition-all duration-400 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center'>
        {videos.map((video) => <Card key={video._id} video={video}/>)}
      </div>
    </div>
  )
}

export default CardsContainer
