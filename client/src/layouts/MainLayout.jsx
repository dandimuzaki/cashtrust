import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Sidebar />
      <div className='md:ml-50 md:px-12 px-4 bg-[var(--background)] w-screen md:w-fit pb-20'>
      <Outlet />
      </div>
    </>
  )
}

export default MainLayout
