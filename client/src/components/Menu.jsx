import React, { useState } from 'react'
import { FaCompass } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { MdSubscriptions } from 'react-icons/md';
import { FaSun, FaMoon } from 'react-icons/fa';
import { MdLogin } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux'
import { toggleMode } from '../redux/mode/modeSlice.js';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { CiLogout } from "react-icons/ci";
import axios from 'axios';
import serverUrl from '../../serverUrl.js';
import { logout } from '../redux/channel/channelSlice.js';




const Menu = () => {
    const lightMode = useSelector((state) => state.mode.value)
    const {currentUser} = useSelector((state) => state.channel)

    const dispatch = useDispatch()
    const [ham, setham] = useState(true);

    const handleClick = () => {
        dispatch(toggleMode())
    }

    const handleHam = () => {
        setham(!ham);
    }

    const handleLogout = async () => {
        try{
            const res = await axios.get(`${serverUrl}/auth/logout`, {withCredentials: true});
            dispatch(logout());
            console.log("logout: ", res.data)
        }
        catch(err){

        }
    }
    
    return (
        <div className='w-auto'>

            <div className={`absolute z-50 top-12 md:hidden sm:block transition-all duration-500 ease-in-out ${ham ? '-left-full' : 'left-0'}`}>
                {<div className='flex flex-col gap-2'>
                    <div className={`menu-container flex flex-col items-center justify-center ${!lightMode ? "bg-white text-black" : "bg-zinc-700 text-white"}  h-auto px-2 pl-0 py-3 rounded-r-lg`}>
                        <div className='items flex flex-col items-center gap-3 text-s'>
                            <Link to={"/"} className='w-full'>
                                <div className='flex flex-col justify-center items-center cursor-pointer w-full hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-r-md p-1'>
                                    <FaHome />
                                    <p className='text-xs'>Home</p>
                                </div>
                            </Link>

                            <Link to={"/explore"} className='w-full'>
                                <div className='flex flex-col justify-center items-center cursor-pointer w-full hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-r-md p-1'>
                                    <FaCompass />
                                    <p className='text-xs'>Explore</p>
                                </div>
                            </Link>

                            <Link to={"/subscriptions"} className='w-full'>
                                <div className='flex flex-col justify-center items-center cursor-pointer w-full hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-r-md p-1'>
                                    <MdSubscriptions />
                                    <p className='text-xs'>Subscriptions</p>
                                </div>
                            </Link>

                            <div onClick={handleClick} className='flex flex-col justify-center items-center cursor-pointer w-full hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-r-md p-1'>
                                {lightMode ? <FaMoon /> : <FaSun />}
                                <p className='text-xs'>Mode</p>
                            </div>
                        </div>
                    </div>

                    {!currentUser ? <Link to={'/signin'} className='w-full'>
                        <div className={`signin ${!lightMode ? "bg-white text-black" : "bg-zinc-700 text-white"} flex flex-col rounded-r-md justify-center items-center p-2 pl-0`}>
                            <div className='flex flex-col justify-center items-center p-1 w-full cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-r-md'>
                                <MdLogin />
                                <p className='text-xs'>Login</p>
                            </div>
                        </div>
                    </Link> :
                    <div title='click to logout' onClick={handleLogout} className={`signout ${!lightMode ? "bg-white text-black" : "bg-zinc-700 text-white"} flex flex-col rounded-r-md justify-center items-center p-2 pl-0`}>
                        <div className='flex flex-col justify-center items-center p-1 w-full cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-r-md'>
                            <CiLogout />
                            <p className='text-xs'>Logout</p>
                        </div>
                    </div> 
                    }
                </div>}
            </div>

            <div onClick={handleHam} className={` ${lightMode ? "text-black" : "text-white"} cursor-pointer text-2xl absolute left-5 top-3 z-50 md:hidden sm:block`}>{ ham ? <GiHamburgerMenu />: <AiOutlineClose/>}</div>
            <div className={`w-full hidden md:block lg:block h-screen sticky top-0 ${!lightMode ? "text-black" : "text-white"} p-3 pl-0 flex flex-col`}>
                <div className='logo text-red-700 mb-4 text-lg font-bold'>MeTube</div>
                <div className={`menu-container flex flex-col items-center justify-center ${!lightMode ? "bg-white" : "bg-zinc-700"}  h-auto px-2 pl-0 py-3 rounded-r-lg`}>
                    <div className='items w-full flex flex-col items-center gap-3 text-s'>
                        <Link to={"/"} className='w-full'>
                            <div className='flex flex-col justify-center items-center cursor-pointer w-full hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-r-md p-1'>
                                <FaHome />
                                <p className='text-xs'>Home</p>
                            </div>
                        </Link>

                        <Link to={"/explore"} className='w-full'>
                            <div className='flex flex-col justify-center items-center cursor-pointer w-full hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-r-md p-1'>
                                <FaCompass />
                                <p className='text-xs'>Explore</p>
                            </div>
                        </Link>
                        <Link to={"/subscriptions"} className='w-full'>
                            <div className='flex flex-col justify-center items-center cursor-pointer w-full hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-r-md p-1'>
                                <MdSubscriptions />
                                <p className='text-xs'>Subscriptions</p>
                            </div>
                        </Link>



                        <div onClick={handleClick} className='flex flex-col justify-center items-center cursor-pointer w-full hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-r-md p-1'>
                            {lightMode ? <FaMoon /> : <FaSun />}
                            <p className='text-xs'>Mode</p>
                        </div>
                    </div>
                </div>

                {!currentUser ? <Link to={'/signin'} className='w-full'>
                    <div className={`signin ${!lightMode ? "bg-white" : "bg-zinc-700"} flex flex-col rounded-r-md justify-center mt-3 items-center p-2 pl-0`}>
                        <div className='flex flex-col justify-center items-center p-1 w-full cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-r-md'>
                            <MdLogin />
                            <p className='text-xs'>Login</p>
                        </div>
                    </div>
                </Link>:
                <div title='click to logout' onClick={handleLogout} className={`signout mt-3 ${!lightMode ? "bg-white text-black" : "bg-zinc-700 text-white"} flex flex-col rounded-r-md justify-center items-center p-2 pl-0`}>
                    <div className='flex flex-col justify-center items-center p-1 w-full cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-r-md'>
                        <CiLogout />
                        <p className='text-xs'>Logout</p>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Menu
