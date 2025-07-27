import React from 'react'
import netflix_logo from '../assets/logo/netflix-logo.png'


const Header = () => {
  return (
    <div className='absolute w-full bg-gradient-to-b from-black/85 h-70 px-10 py-3'> 
      <img src={netflix_logo} className='w-44' alt='logo'/>
    </div>
  )
}

export default Header