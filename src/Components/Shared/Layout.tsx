import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
const Layout = () => {
  return (
    <div className='flex w-full bg-neutral-100 overflow-hidden'>
      <div className='sticky top-0 h-screen'>
        <Sidebar />
      </div>
      <div className="w-full p-4">
        <div className="">{<Outlet />}</div>
      </div>
    </div>
  )
}

export default Layout