import React from 'react'

const Navbar = () => {
  return (
    <nav className='py-4 px-4 md:px-10 flex flex-wrap justify-between items-center bg-emerald-800 text-white my-2'>
      <div className='logo'>
        <span className='font-bold text-lg'>iTasks</span>
      </div>
      <ul className='hidden md:flex gap-8'>
        <li className='font-semibold text-lg cursor-pointer hover:font-bold'>Home</li>
        <li className='font-semibold text-lg cursor-pointer hover:font-bold'>Your Tasks</li>
      </ul>

      <div className='md:hidden text-2xl cursor-pointer'>
        ☰
      </div>
    </nav>
  )
}

export default Navbar