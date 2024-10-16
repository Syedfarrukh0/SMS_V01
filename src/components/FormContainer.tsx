import React from 'react'
import FormModal from './FormModal';
import prisma from '@/lib/prisma';

export type FormContainerProps = {
    table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
    type: "create" | "update" | "delete";
    data?: any;
    id?: number | string;
}

const FormContainer = async ({
    table,
    type,
    data,
    id,
}: FormContainerProps) => {
    // let relatedData: any = {};
    let relatedData: { teachers?: any[]; grades?: any[] } | undefined;

    if (type !== "delete") {
        try {
            switch (table) {
                case "subject":
                    const subjectTeachers = await prisma.teacher.findMany({
                        select: { id: true, name: true, surname: true }
                    })
                    relatedData = { teachers: subjectTeachers.length > 0 ? subjectTeachers : [] }; // Return empty array if no teachers found
                    break;
    
                case "class":
                    const classGrades = await prisma.grade.findMany({
                        select: { id: true, level: true }
                    })
                    const classTeachers = await prisma.teacher.findMany({
                        select: { id: true, name: true, surname: true }
                    })
                    relatedData = { 
                        teachers: classTeachers.length > 0 ? classTeachers : [], // Handle empty teachers case
                        grades: classGrades.length > 0 ? classGrades : [] // Handle empty grades case
                    };

                    console.log(relatedData)
                    break;
    
                default:
                    relatedData = {};
                    break;
            }    
        } catch (error) {
         console.log(error)   
         relatedData = {};
        }
    }

     // Ensure relatedData has default values for teachers and grades
     const { teachers = [], grades = [] } = relatedData || {};

    return (
        <div> <FormModal table={table} data={data} type={type} id={id} relatedData={{ teachers, grades }} /> </div>
        // <div> <FormModal table={table} data={data} type={type} id={id} relatedData={relatedData} /> </div>
    )
}

export default FormContainer