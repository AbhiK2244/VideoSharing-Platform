import React, { useEffect, useState } from 'react'
import { AiOutlineSave } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import CommentCard from './CommentCard';
import serverUrl from '../../serverUrl.js';
import axios from 'axios';

const CommentSection = ({videoId, currentUser}) => {

    const [comments, setComments] = useState([])
    useEffect(() => {
        const fetchComments = async () => {
            try{
                const res = await axios.get(`${serverUrl}/comments/${videoId}`);
                setComments(res.data)
            }
            catch(err){
                console.log("Comments Error", err)
            }
        }
        fetchComments()
    }, [videoId])

    const lightMode = useSelector((state) => state.mode.value)

    const handleClick = (e) => {
        e.preventDefault();
        console.log(comments);
    }
    return (
        <div className='w-full'>
            <div className='addComments flex gap-2 justify-between items-center'>
                <div className='img flex items-center justify-center h-9 w-9 rounded-full bg-neutral-600 cursor-pointer'>
                    {currentUser?.img ? (
                    <img className='w-full h-full rounded-full' referrerPolicy="no-referrer" src={currentUser.img} alt="User" />) : 
                    (currentUser?.name ? currentUser.name[0]?.toUpperCase() : 'U')}
                </div>

                <div className='w-full'>
                    <form className='flex w-full gap-2' action="">
                        <input placeholder='Add a comment...' className={`w-full bg-neutral-100 rounded-full px-4 h-auto ${lightMode ? "bg-neutral-100": "bg-neutral-900 text-wrap"}`} type="text" />
                        <button onClick={handleClick} className={`rounded-full p-2 ${lightMode ? "bg-neutral-500 text-white hover:bg-neutral-600": "bg-neutral-200 text-black hover:bg-neutral-300"}`}><AiOutlineSave /></button>
                    </form>
                </div>
            </div>

            <div className='allcomments mt-4'>
                {comments.map((comment) => <CommentCard comment={comment} key={comment._id} />)}
            </div>
        </div>
    )
}

export default CommentSection
