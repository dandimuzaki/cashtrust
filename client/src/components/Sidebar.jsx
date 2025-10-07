import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import logo from './../assets/logo.png'
import {BarChart, Category, Person, Receipt, Settings, TrendingUp, Tune} from '@mui/icons-material';

const Sidebar = () => {
  return (
    <>
    <div className='text-lg text-white fixed top-0 h-screen w-50 bg-[var(--primary)] hidden md:flex flex-col justify-between'>
      <div>
      <Link to='/'>
      <div className='h-10 my-3'>
        <img src={logo} className='object-cover h-full w-full' />
        </div>
      </Link>
      <NavLink 
        to='/dashboard'
        className={({ isActive }) => `${isActive 
          ? 'bg-[var(--dark-primary)] font-bold' 
          : 'bg-[var(--primary]'} 
          px-5 py-2 flex gap-2 items-center`
      }>
        Dashboard
      </NavLink>
      <NavLink to='/transactions'
        className={({ isActive }) => `${isActive 
          ? 'bg-[var(--dark-primary)] font-bold' 
          : 'bg-[var(--primary]'} 
          px-5 py-2 flex gap-2 items-center`
      }>
        Transactions
      </NavLink>
      <NavLink to='/profile'
        className={({ isActive }) => `${isActive 
          ? 'bg-[var(--dark-primary)] font-bold' 
          : 'bg-[var(--primary]'} 
          px-5 py-2 flex gap-2 items-center`
      }>
        Profile
      </NavLink>
      <NavLink to='/settings'
        className={({ isActive }) => `${isActive 
          ? 'bg-[var(--dark-primary)] font-bold' 
          : 'bg-[var(--primary]'} 
          px-5 py-2 flex gap-2 items-center self-end`
      }>
        Settings
      </NavLink>
      </div>
      <div className='px-5 py-2 flex gap-2 items-center'>
        Logout
      </div>
    </div>
    <div className='md:hidden flex justify-around z-150 fixed bottom-0 w-screen h-16 shadow-[2px_0px_5px_5px_rgba(0,0,0,0.1)] bg-white'>
      <NavLink 
        to='/dashboard'
        className={({ isActive }) => `${isActive 
          ? 'text-[var(--primary)]' 
          : 'text-gray-400'} 
          px-5 py-2 grid text-sm`
      }>
        <div className='flex justify-center'><BarChart/></div>
        Dashboard
      </NavLink>
      <NavLink 
        to='/transactions'
        className={({ isActive }) => `${isActive 
          ? 'text-[var(--primary)]' 
          : 'text-gray-400'} 
          px-5 py-2 grid text-sm`
      }>
        <div className='flex justify-center'><Receipt/></div>
        Transactions
      </NavLink>
      <NavLink 
        to='/profile'
        className={({ isActive }) => `${isActive 
          ? 'text-[var(--primary)]' 
          : 'text-gray-400'} 
          px-5 py-2 grid text-sm`
      }>
        <div className='flex justify-center'><Person/></div>
        Profile
      </NavLink>
      <NavLink 
        to='/categories'
        className={({ isActive }) => `${isActive 
          ? 'text-[var(--primary)]' 
          : 'text-gray-400'} 
          px-5 py-2 grid text-sm`
      }>
        <div className='flex justify-center'><Category/></div>
        Categories
      </NavLink>
      <NavLink 
        to='/settings'
        className={({ isActive }) => `${isActive 
          ? 'text-[var(--primary)]' 
          : 'text-gray-400'} 
          px-5 py-2 grid text-sm`
      }>
        <div className='flex justify-center'><Settings/></div>
        Settings
      </NavLink>
    </div>
    </>
  )
}

export default Sidebar
