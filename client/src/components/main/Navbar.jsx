import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useSelector} from 'react-redux'
import { IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoMdCloudUpload } from "react-icons/io";
import Upload from '../Upload';

const Navbar = () => {
    const lightMode = useSelector((state) => state.mode.value)
    const navigate = useNavigate();
    const {currentUser} = useSelector((state) => state.channel)
    
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");

    const handleSearch = () => {
      navigate(`/search?q=${q}`);
    }


  return (
    <>
    {open && <Upload setOpen={setOpen}/>}
      <div title='search any video' className={`flex justify-center items-center overflow-hidden ${ lightMode? "bg-white text-black" : "bg-black text-white"} sticky top-0 border-b w-[100%] z-40`}>
        <form className='flex justify-center items-center py-2 pl-5 md:pl-14 w-[80%] h-full'>
          <div className={`flex w-[70%] justify-center items-center border-[1px] border-r-0 ${ lightMode? "border-black" : "border-blue-700"} rounded-l-full`}>
              <div className='w-full rounded-l-full border-0 flex justify-center items-center p-1' >
                  <input value={q} onChange={(e) => setQ(e.target.value)} type="text" placeholder='Search' className={`w-[90%] outline-none ${ lightMode? "bg-white text-black" : "bg-black text-white"}`}/>

              </div>
          </div>

          <div onClick={handleSearch} title='search' className={`h-full w-[10%] rounded-r-full border-[1px] border-l-0 cursor-pointer ${ lightMode? "border-black bg-neutral-200 hover:bg-neutral-300" : "border-blue-700 bg-neutral-800 hover:bg-neutral-900"}`}>
              <div className='w-full h-full rounded-l-full border-0 flex justify-center items-center p-1'>
                  <button onClick={(e) => e.preventDefault()} className='m-auto h-full text-xl my-0.5'>
                      <FaSearch />
                  </button>
              </div>
          </div>
        </form>
        {currentUser? <div className='flex gap-6 items-center'>
              <div onClick={() => {setOpen(true)}} title='upload video' className='text-3xl'><IoMdCloudUpload /></div>
              <div title={currentUser} className='h-9 w-9 rounded-full bg-neutral-400 flex justify-center items-center'>{currentUser?.img ? <img referrerPolicy="no-referrer" src={currentUser?.img} className='h-full w-full rounded-full' alt="user" /> : currentUser?.name[0].toUpperCase()}</div>
          </div>
        :<div onClick={() => navigate('/signin')} >
          <button className={`flex justify-center items-center gap-1 border-[1px] ${ lightMode? "border-black hover:bg-neutral-200" : "border-blue-700 hover:bg-neutral-800"} rounded-full px-3 py-2 text-xl `}>
              <IoPersonCircleOutline />
              <div className='text-sm'>Signin</div>
          </button>
        </div>}
      </div>
    </>
  )
}

export default Navbar
