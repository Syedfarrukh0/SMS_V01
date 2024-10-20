import React from "react";
import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Table from "@/components/Table";
// import { role, studentsData, teachersData } from "@/lib/data";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import { Class, Prisma, Student } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import FormContainer from "@/components/FormContainer";
// import { role } from "@/lib/utils";

// type Student = {
//   id: number;
//   studentId: string;
//   name: string;
//   email?: string;
//   photo: string;
//   phone?: string;
//   grade: number;
//   class: string;
//   address: string;
// };

const { sessionClaims } = auth();
const role = (sessionClaims?.metadata as { role?: string })?.role;

type StudentList = Student & {class: Class};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  ...(role === "admin"
    ? [
        {
          header: "Actions",
          accessor: "action",
        },
      ]
    : []),
];

const renderRow = (item: StudentList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4 max-sm:w-[12rem]">
      <Image
        src={item.img || '/noAvatar.png'}
        alt="img.png"
        width={40}
        height={40}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item.class.name}</p>
      </div>
    </td>
    <td className="hidden md:table-cell px-4">{item.userName}</td>
    <td className="hidden md:table-cell px-4">{item.class.name[0]}</td>
    <td className="hidden md:table-cell px-4">{item.phone}</td>
    <td className="hidden md:table-cell px-4">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/students/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            {" "}
            <Image src={"/view.png"} alt="icon" width={16} height={16} />{" "}
          </button>
        </Link>
        {role === "admin" && (
          <FormContainer table="student" type="delete" id={item.id} />
        )}
      </div>
    </td>
  </tr>
);

const StudentListPage = async ({
  searchParams = {},
}: { searchParams?: { [key: string]: string } } | undefined = {}) => {

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL params condition
  const query: Prisma.StudentWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId": {
            query.class = {
              lessons: {
                some: {
                  teacherId: value,
                }
              }
            }
          }
          break;
          case "search": {
            query.name = {contains: value as string, mode: 'insensitive'}
          }
          break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.student.count({where: query}),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-start gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src={"/filter.png"} alt="icon" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src={"/sort.png"} alt="icon" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormContainer table="student" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* list */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* pagination */}
      <Pagination page={p} count={count} />
    </div>
  );
}

export default StudentListPage;
