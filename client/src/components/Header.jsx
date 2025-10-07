import React from 'react'
import logo_ver2 from './../assets/logo_ver2.png'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'

const Header = () => {
  const {user} = useAuth()
  const location = useLocation();

  return (
    <div 
    className={`${location.pathname === '/' ? '' : 'hidden'} fixed z-150 flex justify-center w-full py-4 px-4 sm:px-6 lg:px-8`}>
      <div className='h-16 max-w-6xl backdrop-blur-md bg-white/20 rounded-full flex-1 flex justify-between items-center py-2 px-6 shadow-[0px_0px_5px_2px_rgba(0,0,0,0.1)]'>
      <div className='w-50'>
        <img src={logo_ver2} className='object-cover w-full' />
      </div>

      { user ? (
        <div className='flex gap-4 items-center'>
        <Link to='/dashboard'>
        <button className='border-white border-2 py-1 px-3 text-white rounded'>Dashboard</button>
        </Link>
      </div>
      ) : (
      <div className='flex gap-4 items-center'>
        <Link to='/login'>
        <button className='w-24 border-white border-2 py-1 px-3 text-white rounded'>Login</button>
        </Link>
        <Link to='/register'>
        <button className='w-24 py-1 px-3 rounded border-2 border-white bg-white text-[var(--primary)]'>Register</button>
        </Link>
      </div>)
      }
      </div>
    </div>
  )
}

export default Header
