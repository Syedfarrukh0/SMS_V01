import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Announcements = async () => {

  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as {role?:string})?.role

  const roleConditions = {
    admin: {},
    teacher: {lessons: { some: { teacherId: userId! } }},
    student: {students: { some: { Id: userId! } }},
    parent: {students: { some: { parentId: userId! } }},
  }

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: 'desc' },
    where: {
      OR: [
        {classId: null}, {class: roleConditions[role as keyof typeof roleConditions ] || {} }
      ]
    }
  })
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-lamaSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{data[0].title}</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            {data[0].description}
          </p>
        </div>
        <div className="bg-lamaPurpleLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{data[1].title}</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            {data[1].description}
          </p>
        </div>
        <div className="bg-lamaYellowLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{data[2].title}</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            {data[2].description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Announcements;
