import React from 'react'

const UserImage = ({src}) => {
  return (
        <img className='w-full h-full absolute top-0 left-0' src={src} alt="user" />
  )
}

export default UserImage
