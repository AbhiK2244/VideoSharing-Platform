import React, { useEffect, useState } from 'react'
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { useDispatch, useSelector} from 'react-redux'
import CommentSection from './CommentSection';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { dislike, fetchFailure, fetchStart, fetchSuccess, like } from '../redux/video/videoSlice';
import serverUrl from '../../serverUrl.js';
import { format } from 'timeago.js';
import { subscription } from '../redux/channel/channelSlice';
import VideoItem from './VideoItem';
import Recommendations from './Recommendations';

const VideoContainer = () => {
  const lightMode = useSelector((state) => state.mode.value)
  const {currentUser} = useSelector((state) => state.channel)
  const {currentVideo} = useSelector((state) => state.video)
  const [recco, setRecco] = useState(true);
  const dispatch = useDispatch()
  const {id} = useParams();

  const [channel, setChannel] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try{
        fetchStart();
        const videoRes = await axios.get(`${serverUrl}/videos/find/${id}`);
        const channelRes = await axios.get(`${serverUrl}/users/find/${videoRes.data.userId}`);
        
        // console.log(videoRes.data)
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      }
      catch(err)
      { 
        fetchFailure();
        console.log("videoContent err:", err)
      }
    }
    fetchData();
  }, [id, dispatch])

  const handleLike = async () => {
    await axios.put(`${serverUrl}/users/like/${currentVideo?._id}`,{}, {withCredentials: true})
    dispatch(like(currentUser._id))
  }

  const handleDislike = async () => {
    await axios.put(`${serverUrl}/users/dislike/${currentVideo?._id}`, {}, {withCredentials: true})
    dispatch(dislike(currentUser._id))
  }

  const handleSub = async () => {
    if(currentUser.subscribedUsers.includes(channel._id)){
      await axios.put(`${serverUrl}/users/unsub/${channel?._id}`, {}, {withCredentials: true})
    }else{
      await axios.put(`${serverUrl}/users/sub/${channel?._id}`, {}, {withCredentials: true})
    }  
    dispatch(subscription(channel._id))
  }


  return (
    <div className={`video-page w-full flex gap-3 mt-1 ${ lightMode? "bg-white text-black" : "bg-black text-white"} h-[90vh] overflow-y-auto`}>
      <div className='content md:w-4/6 w-[96vw] mx-auto '>
        <div className='videoContent relative md:ml-10 min-w-[80%] mx-auto '>
          <div className='video max-h-[720px] bg-neutral-500 w-auto'>
            <VideoItem src={currentVideo?.videoUrl}  videoId={currentVideo?._id} />
          </div>
          <div className='title text-lg font-bold mt-3'>
            <h2>{currentVideo?.title}</h2>
          </div>

          <div className='details flex justify-between items-center border-b pb-2'>
            <div className='viewsdata text-xs font-semibold text-neutral-500'>
              <h3>{currentVideo?.views} views . {format(currentVideo?.createdAt)}</h3>
            </div>
            <div className='buttons flex justify-center items-center gap-4 mr-4 text-2xl'>
              <div className='flex justify-center items-center gap-2'>
                <span className={`text-sm ${lightMode? 'bg-neutral-200' : 'bg-neutral-800'} p-1 rounded-md`}>{currentVideo?.likes?.length}</span>
                <AiFillLike onClick={handleLike} className={`${currentVideo?.likes.includes(currentUser?._id) && 'text-blue-600'}`} />
              </div>
              <div className='flex justify-center items-center gap-2'>
              <span className={`text-sm ${lightMode? 'bg-neutral-200' : 'bg-neutral-800'} p-1 rounded-md`}>{currentVideo?.dislikes?.length}</span>
                <AiFillDislike onClick={handleDislike} className={`${currentVideo?.dislikes.includes(currentUser?._id) && 'text-blue-600'}`} style={{ transform: 'rotateY(180deg)' }}/>
              </div>
            </div>
          </div>

          <div className='channelinfo flex mt-3 gap-2'>
            <div className='img h-9 w-9 rounded-full bg-neutral-600 cursor-pointer flex justify-center items-center text-2xl'>
                {channel?.img ? (
                <img className='w-full h-full rounded-full' referrerPolicy="no-referrer" src={channel.img} alt="User" />) : 
                (channel?.name ? channel.name[0]?.toUpperCase() : 'U')}
            </div>

            <div className='infoAndDesc w-full'>
              <div className='channelInfo w-full flex justify-between items-center'>
                <div className="info flex flex-col">
                  <span className='text-sm font-bold'>{channel?.name}</span>
                  <span className='text-[12px] text-neutral-500'>{channel?.subscribers} Subscriber</span>
                </div>
                <div className="button flex justify-center items-center mr-3 w-[27%] lg:w-[18%] hover:bg-red-600 bg-red-500 rounded-full px-3 py-1 cursor-pointer text-white">
                  <button onClick={handleSub}>{currentUser?.subscribedUsers?.includes(channel?._id)? "Unsubscribe" : "Subscribe"}</button>
                </div>
              </div>

              <div className='disc mt-3 text-xs text-justify'>
                <p>{currentVideo?.desc}</p>
              </div>

            </div>
          </div>
        </div>

        <div className='Comments relative md:ml-10 min-w-[80%] mx-auto mt-4'>
            <CommentSection currentUser={currentUser} videoId={id} />
        </div>
      </div>

      {recco && <div className='recommendation w-2/6 hidden md:block'>
      {/* {cards.map((card) => <Card key={card._id} type="rec" card={card}/>)} */}
        <Recommendations tags={currentVideo.tags} setRecco={setRecco}/>
      </div>}
    </div>
  )
}

export default VideoContainer
