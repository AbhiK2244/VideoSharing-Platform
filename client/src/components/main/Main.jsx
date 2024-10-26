import React from 'react'
import Navbar from './Navbar'
import CardsContainer from './CardsContainer'


const Main = ({type}) => {
  return (
    <div className='main w-full overflow-hidden'>
      <Navbar />
      < CardsContainer type={type}/>
    </div>
  )
}

export default Main
