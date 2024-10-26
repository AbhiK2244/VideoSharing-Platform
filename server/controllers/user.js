import { CreateError } from "../error.js"
import User from "../models/User.js";
import Video from "../models/Video.js";

export const update = async(req, res, next) => {
    // req.user.id is from the token
    if(req.params.id === req.user.id)
    {
        try{
            //see new: true will return the newest version of our user
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});

            res.status(200).json(updatedUser);
        }
        catch(err)
        {
            next(err);
        }
    }
    else{
        return next(CreateError(403, "You can update your account only!"))
    }
}

export const deleteUser = async(req, res, next) => {
    if(req.params.id === req.user.id)
    {
        try{
            await User.findByIdAndDelete(req.params.id);

            res.status(200).json("user has been deleted!");
        }
        catch(err)
        {
            next(err);
        }
    }
    else{
        return next(CreateError(403, "You can delete only your account!"))
    }
}

//the id is from other channel
export const getUser = async(req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        // console.log(user, req.params.id)

        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }
    catch(err)
    {
        next(err)
    }
}

//the id is from other channel
export const subscribe = async(req, res, next) => {
    try{
        const subscribedTo = req.params.id; //other user
        const subscribedBy = req.user.id; //this user
        
        //push the id of other channel into the subcribedChannel array:: using push method
        await User.findByIdAndUpdate(subscribedBy, {
            $push:{
                subscribedUsers: subscribedTo
            }
        });

        //using incrimental method of mongodb: increase the subscriber count of other user by 1
        await User.findByIdAndUpdate(subscribedTo, {
            $inc: {subscribers: 1}
        });

        res.status(200).json("Subscription Successfull.");

    }
    catch(err)
    {
        next(err)
    }
}

//the id is from other channel
export const unsubscribe = async(req, res, next) => {
    try{
        const subscribedTo = req.params.id; //other user
        const subscribedBy = req.user.id; //this user
        
        //pull the id of other channel into the subcribedChannel array:: using pull method
        await User.findByIdAndUpdate(subscribedBy, {
            $pull:{
                subscribedUsers: subscribedTo
            }
        });

        //using incrimental method of mongodb: decrease the subscriber count of other user by 1
        await User.findByIdAndUpdate(subscribedTo, {
            $inc: {subscribers: -1}
        });

        //to make sure that the subscriber count is always zero if no one has subscribed.
        // // Find the current subscriber count of the other user
        // const userToUnsubscribe = await User.findById(subscribedTo);
        // const currentSubscribers = userToUnsubscribe.subscribers;

        // // Ensure that the subscriber count does not go below 0
        // if (currentSubscribers > 0) {
        //     await User.findByIdAndUpdate(subscribedTo, {
        //         $inc: { subscribers: -1 }
        //     });
        // }
        // else{
        //     next(CreateError(403,"You cannot unsubscribe."))
        // }

        res.status(200).json("Unsubscription Successfull.");
    }
    catch(err)
    {
        next(err)
    }
}

export const like = async(req, res, next) => {
    try{
        const userId = req.user.id;
        const videoId = req.params.videoId;

        //addToSet make sure that your user id has not been pushed multiple times. even if you like it multiple time
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: {likes: userId},
            $pull: {dislikes: userId}
        })
        res.status(200).json("the video has been liked.")
    }
    catch(err)
    {
        next(err)
    }
}

export const dislike = async(req, res, next) => {
    try{
        const userId = req.user.id;
        const videoId = req.params.videoId;

        //addToSet make sure that your user id has not been pushed multiple times. even if you like it multiple time
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: {dislikes: userId},
            $pull: {likes: userId}
        })
        res.status(200).json("the video has been disliked.")
    }
    catch(err)
    {
        next(err)
    }
}


export const unlike = async(req, res, next) => {
    try{
        const userId = req.user.id;
        const videoId = req.params.videoId;

        //addToSet make sure that your user id has not been pushed multiple times. even if you like it multiple time
        await Video.findByIdAndUpdate(videoId, {
            $pull: {likes: userId}
        })
        res.status(200).json("the video has been Unliked.")
    }
    catch(err)
    {
        next(err)
    }
}

export const undislike = async(req, res, next) => {
    try{
        const userId = req.user.id;
        const videoId = req.params.videoId;

        //addToSet make sure that your user id has not been pushed multiple times. even if you like it multiple time
        await Video.findByIdAndUpdate(videoId, {
            $pull: {dislikes: userId}
        })
        res.status(200).json("the video has been Undisliked.")
    }
    catch(err)
    {
        next(err)
    }
}