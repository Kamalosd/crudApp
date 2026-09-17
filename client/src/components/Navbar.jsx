import React from 'react'

const Navbar = () => {
  return (

<div className='w-full h-20 bg-gray-500 flex justify-between items-center px-9'>

  <div >
    <h1 className='font-bold'>logo</h1>
  </div>
  <div>
    <ul className='flex gap-6 font-semibold '>
      <li>home</li>
      <li>about</li>
      <li>contact</li>
    </ul>
  </div>
</div>


  )
}

export default Navbar
