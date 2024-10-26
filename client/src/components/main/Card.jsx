import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {format} from "timeago.js"
import serverUrl from '../../../serverUrl.js'

const Card = ({ video, type, h }) => {
    const lightMode = useSelector((state) => state.mode.value)

    const [channel, setChannel] = useState({});

    useEffect (() => {
        const fetchUser = async () => {
          try{
            const res = await axios.get(`${serverUrl}/users/find/${video.userId}`);
            const data = await res.data;
            setChannel(data);
            // console.log(data)
          }
          catch(err){
            console.log("Error: ", err);
          }
        }
    
        fetchUser()
      }, [video.userId])

    return (
        <Link to={`/video/${video._id}`}>
            <div className={`${type == "rec" ? `${h ? "h-[220px]" : "lg:h-[120px] md:h-[90px]"} flex w-[90%]` : "md:w-[300px] w-[75vw] h-[290px] md:h-[220px] mb-7"} ${lightMode ? "bg-white text-black" : "bg-black text-white"} mt-3 ml-4 rounded-md `}>
                <div className={`img ${type == "rec" ? "h-full w-[50%] rounded-md" : "h-[70%] w-full"}   bg-cover relative`}>
                    <img src={video.imgUrl} alt="" className={`h-full w-full object-cover
             absolute top-0 left-0 ${type == "rec" ? "rounded-l-md" : "rounded-md"}`} />
                </div>

                <div className={`desc flex gap-3 ${type == "rec" ? "ml-2 w-[50%]" : "mt-3 w-full"}`}>
                    <div className={`channel ${type == "rec" && "hidden"} img h-9 w-9 relative rounded-full`}>
                        <img src={channel.img} alt="" className='h-full w-full rounded-full absolute top-0 left-0' />
                    </div>
                    <div className='w-[85%]'>
                        <div className='details text-wrap w-full'>
                            <p className={`font-semibold text-wrap`}>
                                {video.title}
                            </p>
                        </div>
                        <div className='w-4/6'>
                            <p className={`text-sm  font-semibold ${lightMode ? "text-neutral-600" : "text-neutral-400"}`}>{channel.name}</p>
                            <div className={`flex justify-between text-[12px]  font-mediumbold ${lightMode ? "text-neutral-600" : "text-neutral-400"}`}>
                                <span>{video.views} views</span>
                                <span>{format(video.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Link>
    )
}

export default Card
