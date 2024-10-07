import React from "react";
import Image from "next/image";
import BigCalendar from "@/components/BigCalendar";
import Announcements from "@/components/Announcements";
import Link from "next/link";
import Performance from "@/components/Performance";

function SingleTeacherpage() {
  return (
    // <div className="flex--1 p-4 flex--col gap-4 xl:flex--row grid grid-cols-1 lg:grid-cols-5">
    <div className="p-4 flex gap-4 flex-col md:flex-row max-lg:flex-wrap">
      {/* Left  */}
      {/* <div className="w-full xl:w--2/3 xl:col-span-3"> */}
      <div className="w-full lg:w-2/3 flex flex-col">
        {/* top */}
        <div className="flex flex-col xl:flex-row gap-4">
          {/* user card info */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4 flex-col sm:flex-row">
            <div className="w-full sm:w-1/3">
              <Image
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQygQTRmjO2KZB8KrHBKyW31wO8uQz0Ev7iA&s"
                }
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover mx-auto sm:mx-0"
              />
            </div>
            <div className="w-full sm:w-2/3 flex flex-col justify-between gap-2">
              <div className="flex flex-col gap-2">
                <h1 className="text-sm font-semibold">Leonard Snyder</h1>
                <p className="text-sm text-gray-500">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src={"/blood.png"} alt="img" width={14} height={14} />
                  <span>A+</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src={"/date.png"} alt="img" width={14} height={14} />
                  <span>January 2025</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src={"/mail.png"} alt="img" width={14} height={14} />
                  <span>user@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src={"/phone.png"} alt="img" width={14} height={14} />
                  <span>+92 316 2140279</span>
                </div>
              </div>
            </div>
          </div>
          {/* small card */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%]">
              <Image
                src={"/singleAttendance.png"}
                alt="img"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%]">
              <Image
                src={"/singleBranch.png"}
                alt="img"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semibold">2</h1>
                <span className="text-sm text-gray-400">Branches</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%]">
              <Image
                src={"/singleLesson.png"}
                alt="img"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%]">
              <Image
                src={"/singleClass.png"}
                alt="img"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* bottom */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>

      {/* Right  */}
      <div className="w-full lg:w-1/3 flex flex-col gap--8 gap-4">
        <div className="bg-white p-4 rounded-md flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Shortcuts</h1>
            <div className="mt-4 fllex gap-4 flexx-wrap grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 text-xs text-gray-500">
                <Link className="p-3 rounded-md bg-lamaSkyLight" href={'/'}>Teacher&apos;s Classes</Link>
                <Link className="p-3 rounded-md bg-lamaPurpleLight" href={'/'}>Teacher&apos;s Students</Link>
                <Link className="p-3 rounded-md bg-lamaYellowLight" href={'/'}>Teacher&apos;s Lessons</Link>
                <Link className="p-3 rounded-md bg-pink-50" href={'/'}>Teacher&apos;s Exams</Link>
                <Link className="p-3 rounded-md bg-lamaSkyLight" href={'/'}>Teacher&apos;s Assignments</Link>
            </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
}

export default SingleTeacherpage;
