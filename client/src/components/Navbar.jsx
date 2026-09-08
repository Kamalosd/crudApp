import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full bg-gray-500 flex justify-between h-15 px-10 items-center'>
      <div className='w-[30%] flex items-center h-full'>
         <h1 className='font-bold'>Logo</h1>
      </div>
      <div className='w-[50%] '>
        <ul className='w-full h-full flex gap-6 list-none items-center cursor-pointer'>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

      </div>
      
    </div>
  )
}

export default Navbar
