import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import serverUrl from '../../serverUrl.js';

const CommentCard = ({comment}) => {
    const [commentUser, setCommentUser] = useState({});

    useEffect(() => {
        const fetchUser = async() => {
            try
            {
                const user = await axios.get(`${serverUrl}/users/find/${comment.userId}`);
                setCommentUser(user.data);
            }
            catch(err)
            {
                console.log("Comment Card Error:", err)
            }
        }
        fetchUser()
    },[comment.userId])
    return (
        <div className='addComments flex gap-2 justify-between mt-3'>
            <div className='img flex justify-center items-center text-2xl h-9 w-9 rounded-full bg-neutral-600 cursor-pointer'>
            {commentUser?.img ? (
                <img className='w-full h-full rounded-full' src={commentUser.img} alt="User" />) : 
                (commentUser?.name ? commentUser.name[0]?.toUpperCase() : 'U')}
            </div>

            <div className='w-full'>
                <div className='flex gap-2 items-center'>
                    <span className='text-[12px] font-bold'>{commentUser?.name}</span>
                    <span className='text-[10px] font-bold text-neutral-500'>{format(comment.createdAt)}</span>
                </div>
                <div className='w-full'>
                    <p className='w-full text-[12px] text-justify'>
                        {comment.desc}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CommentCard
