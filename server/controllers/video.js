import { CreateError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

//to add a video
export const addVideo = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const newVideo = new Video({ userId, ...req.body });

        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);

    }
    catch (err) {
        next(err);
    }
}

//to update a video
export const updateVideo = async (req, res, next) => {
    try {
        const videoId = req.params.id;
        const video = await Video.findById(videoId);

        if (!video) {
            return next(CreateError(404, "video not found!"))
        }

        const userId = req.user.id;
        if (userId === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(videoId, {
                $set: req.body
                },
                {
                    new: true
                }
            );

            res.status(200).json(updatedVideo);
        }
        else {
            next(CreateError(403, "You can only update your videos"));
        }

    }
    catch (err) {
        next(err);
    }
}

//to delete a videl
export const deleteVideo = async (req, res, next) => {
    try {
        const videoId = req.params.id;
        const video = await Video.findById(videoId);

        if (!video) {
            return next(CreateError(404, "video not found!"))
        }

        const userId = req.user.id;
        if (userId === video.userId) {
            await Video.findByIdAndDelete(videoId);
            res.status(200).json("Video has been deleted.");
        }
        else {
            next(CreateError(403, "You can only delete your videos"));
        }
    }
    catch (err) {
        next(err);
    }
}

//to get a specific video
export const getVideo = async (req, res, next) => {
    try {
        const videoId = req.params.id;
        const video = await Video.findById(videoId);
        res.status(200).json(video);
    }
    catch (err) {
        next(err);
    }
}

//add view
export const addView = async (req, res, next) => {
    try {
        const videoId = req.params.videoId;
        await Video.findByIdAndUpdate(videoId, {
            $inc: {views: 1}
        });
        res.status(200).json("The view has been increased.");
    }
    catch (err) {
        next(err);
    }
}

//research about it
export const random = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{$sample: { size : 40 }}]);
        res.status(200).json(videos);
    }
    catch (err) {
        next(err);
    }
}

//returns trendy videos one with more views
export const trends = async (req, res, next) => {
    try {
        //this is going to return the videos in descending order of views (more views to less views) (-1: descending, 1: ascending)
        const videos = await Video.find().sort({views: -1});
        res.status(200).json(videos);
    }
    catch (err) {
        next(err);
    }
}

//to retrieve all the videos of subscribed channel
export const sub = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);


        const subscribedChannels = user.subscribedUsers;

        //to find all the videos of each channels we gonna use promise loop

        const list = await Promise.all(
            subscribedChannels.map((channelId) => {
                return Video.find({userId : channelId});
            })
            );

            //.flat() list method is used to concatenates all sub-arrays into a single array
            //.sort() method to sort the method order of newest appear first
            res.status(200).json(list.flat().sort((a, b) => (b.createdAt - a.createdAt)));
    }
    catch (err) {
        next(err);
    }
}

//get video by tag
export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
        //$in will check if specific element is present in tags array or not
        const videos = await Video.find({tags: {$in: tags}}).limit(20);
        res.status(200).json(videos);
    }
    catch (err) {
        next(err);
    }
}

//search by title
export const search = async (req, res, next) => {
    try {
        const query = req.query.q;
        const videos = await Video.find({title: {$regex: query, $options: "i"}}).limit(40);
        res.status(200).json(videos);
    }
    catch (err) {
        next(err);
    }
}

// $regex: query:

// query is the search term that the user enters. If query = "funny", this means "find me all video titles that contain the word funny."
// The search is not exact. It can find the word anywhere in the title, like at the start, in the middle, or at the end.


// $regex: The $regex operator is used to perform a pattern match (regular expression search) in MongoDB.
// The query variable is used as the regular expression pattern. This means that MongoDB will search for videos where the title field contains the text provided in query.
// $option: "i":
// The "i" option makes the regular expression case-insensitive. This means it will match the query regardless of whether the title is in uppercase or lowercase.
// For example, if query = "example", it would match both "Example" and "example" in the title.


























// Promise.all():
// Promise.all(): This function takes an array of promises (in this case, the promises returned by each Video.find() call) and waits for all of them to resolve. It returns a single promise that resolves to an array of the results of all the promises.
// In this case, Promise.all() waits for all Video.find() queries to complete. Once all the queries have finished, it resolves to an array where each element is the result of a Video.find() query (i.e., an array of videos for each channelId).

//for .sort()
// a: The first video in the comparison.
// b: The second video in the comparison.
// b.createdAt - a.createdAt: This subtracts the createdAt value of video a from video b. If b.createdAt is more recent (i.e., a larger value), the result will be positive, meaning b will appear before a in the sorted array.
// This ensures that videos are sorted in descending order, meaning newest videos appear first.
