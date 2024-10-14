import React from "react";
import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Table from "@/components/Table";
// import { assignmentsData, classesData, examsData, lessonsData, parentsData, role, studentsData, subjectsData, teachersData } from "@/lib/data";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { role, currentUserId } from "@/lib/utils";

// type Assignment = {
//   id: number;
//   subject: string;
//   class: string;
//   teacher: string;
//   duedate: string;
// };

type AssignmentList = Assignment & {
  lesson: { subject: Subject; class: Class; teacher: Teacher };
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Due Date",
    accessor: "duedate",
    className: "hidden md:table-cell",
  },
  ...(role === "admin" || role === "teacher" ? [{
    header: "Actions",
    accessor: "action",
  }]: []),
];

const renderRow = (item: AssignmentList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4 max-sm:w-[12rem]">
      {item.lesson.subject.name}
    </td>
    <td className="px-4">{item?.lesson.class?.name}</td>
    <td className="hidden md:table-cell px-4">
      {item?.lesson?.teacher?.name + " " + item?.lesson?.teacher?.surname}
    </td>
    <td className="hidden md:table-cell px-4">
      {item.dueDate
        ? new Intl.DateTimeFormat("en-US").format(new Date(item.dueDate))
        : "N/A"}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {(role === "admin" || role === "teacher") && (
          <>
            <FormModal table="assignment" type="update" data={item} />
            <FormModal table="assignment" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const AssignmentListPage = async ({
  searchParams = {},
}: { searchParams?: { [key: string]: string } } | undefined = {}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL params condition
  const query: Prisma.AssignmentWhereInput = {};

  query.lesson = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            {
              query.lesson.teacherId = value;
            }
            break;
          case "classId":
            {
              query.lesson.classId = parseInt(value);
            }
            break;
          case "search":
            {
              query.lesson.subject = {
                name: { contains: value, mode: "insensitive" },
              };
            }
            break;
          default:
            break;
        }
      }
    }
  }

  // Role Condition
  switch (role) {
    case "admin":
      break;

    case "teacher":
      query.lesson.teacherId = currentUserId!;
      break;

    case "student":
      query.lesson.class = {
        students: {
          some: { id: currentUserId! }
        }
      };
      break;

    case "parent":
      query.lesson.class = {
        students: {
          some: { parentId: currentUserId! }
        }
      };
      break;

    default:
      break;
  }

  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
            class: { select: { name: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.assignment.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Assignments
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-start gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src={"/filter.png"} alt="icon" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src={"/sort.png"} alt="icon" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="assignment" type="create" />}
          </div>
        </div>
      </div>
      {/* list */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* pagination */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AssignmentListPage;
