import { CreateError } from "../error.js";
import Comment from "../models/Comment.js"
import Video from "../models/Video.js";
export const addComment = async(req, res, next) => {
    try{
        const userId = req.user.id;
        const newComment = new Comment({...req.body, userId});

        const savedComment = await newComment.save();

        res.status(200).json(savedComment);
    }
    catch(err)
    {
        next(err);
    }
}

export const deleteComment = async(req, res, next) => {
    try{
        const commentId = req.params.id;
        const userId = req.user.id;

        const comment = await Comment.findById(commentId);
        const videoId = comment.videoId;

        const video = await Video.findById(videoId);

        if(userId === comment.userId || userId === video.userId)
        {
            await Comment.findByIdAndDelete(commentId);
            res.status(200).json("Comment has been deleted");
        }
        else{
            return next(CreateError(403, "You can not delete this comment."))
        }
    }
    catch(err)
    {
        next(err);
    }
}

export const getComments = async(req, res, next) => {
    try{
        const videoId = req.params.videoId;
        const comments = await Comment.find({videoId});
        res.status(200).json(comments)
    }
    catch(err)
    {
        next(err);
    }
}