import React, { useState } from 'react'
import serverUrl from '../../serverUrl.js';
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess} from '../redux/channel/channelSlice.js';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase.js';
import { signInWithPopup } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';

const SignIn = () => {
    const [signinBtn, setSignin] = useState(true);
    const [error, setError] = useState("");
    const [ShowError, setShowError] = useState(true)

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleSignin = async () => {
      if(signinBtn)
      {
        try{
          dispatch(loginStart())
          const res = await axios.post(`${serverUrl}/auth/signin`, {name, password}, {
            withCredentials: true  // This allows cookies to be included
        });
          dispatch(loginSuccess(res.data))
          console.log(res.data)
          // navigate("/")
        }
        catch(err)
        {
          console.log(err)
          dispatch(loginFailure())
          if(err.response.status === 500)
          {
            setError("Internal Server Error!")
          }
          else{
            setError(err.response.data.message)
          }
          setShowError(true);
        }
      }
      else{
        try{
          const res = await axios.post(`${serverUrl}/auth/signup`, {name, password, email});
          console.log(res.data)
          setError(res.data); // to show the text data from server if user is created
        }
        catch(err)
        {
          console.log(err)
          if(err.response.status === 500)
          {
            setError("Internal Server Error!")
          }
          else{
            setError(err.response.data.message)
          }
          setShowError(true);
        }
      }
      setName("")
      setEmail("")
      setPassword("")

    }

    const signInWithGoogle = async() => {
      try{
        dispatch(loginStart())
        const result = await signInWithPopup(auth, provider);
        console.log("result", result.user)
        const name = result.user.displayName;
        const email = result.user.email;
        const img = result.user.photoURL;
        const res = await axios.post(`${serverUrl}/auth/google`, {name, email, img}, {
          withCredentials: true  // This allows cookies to be included
        });

        dispatch(loginSuccess(res.data))
      
      }
      catch(err)
      {
        console.log("auth error:", err)
        dispatch(loginFailure())
      }
    }
    
  return (
    <div className='overflow-hidden relative'>

      {/* error */}
      {error.length !== 0 && ShowError && <div className='z-50 px-3 py-1 bg-white rounded-md text-black absolute top-4 left-4 flex items-center'><span>{error}</span> <span className='ml-2 text-red-600 cursor-pointer' onClick={() => setShowError(false)}><RxCross2 /></span></div>}


      <div className='z-10 text-red-500 text-[10vw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse'>
      </div>

      <div className='z-40 relative w-screen h-screen bg-black bg-opacity-80 flex justify-center items-center'>
        <div className='w-[80%] md:w-[22%] bg-white rounded-md py-10 px-3 text-center'>
            <p className='text-2xl font-bold'>{signinBtn? "Sign In" : "Sign Up"}</p>
            <button onClick={signInWithGoogle} className='px-2 py-1 shadow hover:shadow-md hover:border rounded-md my-2 text-sm flex items-center gap-2 h-10 mx-auto'> <FaGoogle /> Continue with Google</button>
            <form className='flex flex-col gap-3 mt-2'>
                <div className='bg-neutral-400 w-4/5 mx-auto rounded-sm p-0.5'>
                    <input className='w-full bg-neutral-300 py-1 px-2 rounded-sm outline-none' placeholder='Username' name='name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                {!signinBtn && <div className='bg-neutral-400 w-4/5 mx-auto rounded-sm p-0.5'>
                    <input className='w-full bg-neutral-300 py-1 px-2 rounded-sm outline-none' disabled={signinBtn} placeholder='email' name='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>}
                <div className='bg-neutral-400 w-4/5 mx-auto rounded-sm p-0.5'>
                    <input className='w-full bg-neutral-300 py-1 px-2 rounded-sm outline-none' placeholder='password' name='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button onClick={(e) => {e.preventDefault(); handleSignin()} } className='px-3 py-2 bg-neutral-300 w-2/5 mx-auto rounded-md hover:bg-neutral-400'>{signinBtn? "Sign In" : "Sign Up"}</button>
            </form>

            <div className='flex mt-7 justify-start items-center gap-2'>
                <p className='text-xs text-neutral-700'>{signinBtn? "Create an account." : "Already have an account? "}</p>
                <div className='text-xs text-blue-500 cursor-pointer' onClick={() => setSignin(!signinBtn)}>{signinBtn? "Sign Up" : "Sign In"}</div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default SignIn
