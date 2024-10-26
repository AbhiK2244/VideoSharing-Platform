import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase.js"
import axios from 'axios';
import serverUrl from '../../serverUrl.js';
import { useNavigate } from 'react-router-dom';

const Upload = ({setOpen}) => {
    const lightMode = useSelector((state) => state.mode.value)
    const navigate = useNavigate()

    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);

    const [imgPerc, setImgPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);

    const [inputs, setInputs] = useState({})

    const [tags, setTags] = useState([]);

    const handleTags = (e) => {
        setTags(e.target.value.split(','))
    }

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setInputs((prev) => {
            return {...prev, [name]: value}
        })
    }


    const uploadFile = (file, urlType) => {
        //firebase upload process
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress))
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default: break;
                }
            }, 
            (error) => {
                // Handle unsuccessful uploads
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => {
                        return {...prev, [urlType]: downloadURL}
                    })
                });
            }
        );
    }

    useEffect(() => {video && uploadFile(video, "videoUrl")}, [video])
    useEffect(() => {img && uploadFile(img, "imgUrl")}, [img])

    const handleUploads = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(`${serverUrl}/videos`, {...inputs, tags}, {withCredentials: true});
            res.status === 200 && navigate(`/video/${res.data._id}`)

        }
        catch(err)
        {
            console.log("Upload Error", err)
        }
    }


  return (
    <div className={`${ lightMode? "bg-opacity-55" : "bg-opacity-65"} absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-black z-50`}>
      <div className={`bg-neutral-700 text-white flex flex-col justify-center w-[90%] md:w-[60%] h-[80%] rounded-md z-50 gap-3`}>
        <div className='title flex items-center justify-between px-5 py-3 bg-opacity-0 w-full'>
            <p className='font-bold text-2xl'>Upload a New Video</p>
            <div onClick={() => setOpen(false)} className='px-3 py-0.5 rounded-md bg-red-500 flex justify-center items-center cursor-pointer'>X</div>
        </div>

        <form className='px-5 flex flex-col justify-center gap-4 w-full' action="">
            <div className='flex items-center gap-4 border py-2 px-3 rounded-md'>
                <label className='text-md font-semibold' htmlFor="video">Choose video:</label>
                {videoPerc > 0?("Uploading... " + videoPerc + "%") :<input onChange={(e) => setVideo(e.target.files[0])} className='bg-transparent text-xs' type="file" accept='video/*' id='video' required/>}
            </div>
            <input name='title' onChange={handleChange} className=' px-3 py-1 border outline-none rounded-md bg-transparent' type="text" placeholder='Title' required/>
            <textarea name='desc' onChange={handleChange} className=' px-3 py-1 border outline-none rounded-md bg-transparent resize-none' type="text" rows={4} placeholder='Descriptions' required/>
            <input onChange={handleTags}  className=' px-3 py-1 border outline-none rounded-md bg-transparent' type="text" placeholder='Tags (separate tags with comma)'/>
            <div className='flex items-center gap-4 border py-2 px-3 rounded-md'>
                <label className='text-md font-semibold' htmlFor="thumbnail">Thumbnail:</label>
               {imgPerc > 0?("Uploading... " + imgPerc + "%") : <input onChange={(e) => setImg(e.target.files[0])}  className='bg-transparent text-xs' type="file" accept='image/*' id='thumbnail'/>}
            </div>
            <button onClick={handleUploads} className='bg-neutral-800 hover:bg-neutral-900 py-1 my-1 rounded-md'>Upload</button>
        </form>
      </div>
    </div>
  )
}

export default Upload
