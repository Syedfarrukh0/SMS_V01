import React from 'react'
import Announcements from '@/components/Announcements'
import EventCalendar from '@/components/EventCalendar'
import BigCalendarContainer from '@/components/BigCalendarContainer'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
// import 'react-big-calendar/lib/css/react-big-calendar.css'

const StudentPage = async () => {

  const { userId } = auth();
  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! } }
    }
  })

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* Left */}
      <div className='w-full xl:w-2/3'>
        <div className='h-full bg-white p-4 rounded-md'>
          <h1 className='text-xl font-semibold'>Schedule (4A)</h1>
          <BigCalendarContainer type='classId' id={classItem[0].id} />
        </div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  )
}

export default StudentPage