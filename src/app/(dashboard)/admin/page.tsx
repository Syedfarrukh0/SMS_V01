import React from 'react'
import UserCard from '@/components/UserCard'
import AttendanceChart from '@/components/AttendanceChart'
import CountChart from '@/components/CountChart'
import FinanceChart from '@/components/FinanceChart'
import EventCalendar from '@/components/EventCalendar'

function AdminPage() {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row max-lg:flex-wrap'>
      {/* left */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
        {/* user cards */}
        <div className='flex gap-4 justify-between flex-wrap'>
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
          <div className='w-full lg:w-2/3 h-[450px]'>
          <AttendanceChart />
          </div>
        </div>
        {/* bottom charts */}
        <div className='w-full h-[500px]'><FinanceChart /></div>
      </div>
      {/* right */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'><EventCalendar /></div>
    </div>
  )
}

export default AdminPage