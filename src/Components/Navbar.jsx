import React from 'react'

const Navbar = () => {
  return (
    <nav className = 'py-4 flex justify-between bg-emerald-800 text-white my-2'>
        <div className='logo'>
            <span className='font-bold text-lg mx-7 px-20'>iTasks</span>
        </div>
        <ul className = 'flex gap-8 mx-20'>
            <li className='font-semibold text-lg cursor-pointer hover:font-bold transition-all duration-50'>Home</li>
            <li className='font-semibold text-lg cursor-pointer hover:font-bold transition-all duration-50'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar