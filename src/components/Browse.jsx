import React from 'react'
import Header from './Header'

const Browse = () => {
  return (
    <>
      <Header />
      <div className='w-full h-screen'>
        <h1 className='text-white text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute text-4xl font-bold'>Browse</h1>
      </div>
    </>
  )
}

export default Browse;