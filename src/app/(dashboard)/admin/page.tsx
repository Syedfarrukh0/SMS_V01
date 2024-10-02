import CountChart from '@/components/CountChart'
import UserCard from '@/components/UserCard'
import React from 'react'

function AdminPage() {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row flex-wrap'>
      {/* left */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
        {/* user cards */}
        <div className='flex gap-4 justify-between'>
          <UserCard type='student' />
          <UserCard type='student' />
          <UserCard type='student' />
          <UserCard type='student' />
        </div>
        {/* middle charts */}
        <div className='flex gap-4 flex-col lg:flex-row'>
          {/* count chart */}
          <div className='w-full lg:w-1/3 h-[450px]'><CountChart /></div>
          {/* attendance chart */}
          <div className='w-full lg:w-2/3 h-[450px]'></div>
        </div>
        {/* bottom charts */}
        <div></div>
      </div>
      {/* right */}
      <div className='w-full lg:w-1/3'>r</div>
    </div>
  )
}

export default AdminPage