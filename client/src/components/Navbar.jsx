import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem("userAuth")
    navigate("/login")
  }
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
  <button className='py-1 px-4 bg-orange-500  cursor-pointer text-white' onClick={handleLogout}>Logout</button>
</div>


  )
}

export default Navbar
