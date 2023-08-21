import React from 'react'
import classNames from 'classname'
import { FcBarChart } from 'react-icons/fc'
import { DASHBOARD_SIDEBAR_LINKS } from '../../lib/consts'
import { Link, useLocation } from 'react-router-dom'
const linkClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

const Sidebar = () => {
  return (
    <div className="bg-neutral-900 p-3 w-60 flex h-full text-white flex-col">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcBarChart fontSize={24} />
        <span className='text-neutral-100 text-lg'>Dashboard</span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />

        ))}
      </div>
    </div>
  )
}
export default Sidebar

function SidebarLink({ item }) {
  const { pathname } = useLocation()
  return (
    <Link to={item.path} className={classNames(pathname === item.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClasses)}>
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  )
}