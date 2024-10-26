import axios from 'axios';
import React, { useEffect, useState } from 'react'
import serverUrl from '../../serverUrl.js';
import Card from './main/Card.jsx';

const Recommendations = ({tags, setRecco}) => {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try{
                const res = await axios.get(`${serverUrl}/videos/tags?tags=${tags}`);

                if(res.data === 0)
                {
                    setRecco(false);
                }
                setVideos(res.data);
            }
            catch(err)
            {
                console.log("Reccommendation video Error:", err)
            }
        }

        fetchVideos();
    }, [tags])

  return (
        <div className='w-full'>
            {videos.map((video) => <Card key={video._id} video={video} type="rec" />)}
        </div>
  )
}

export default Recommendations
