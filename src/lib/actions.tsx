"use server"

import { ClassSchema, SubjectSchema } from "./formValidationSchemas"
import prisma from "./prisma"

type CurrentState = { success: boolean; error: boolean }

export const createSubject = async (currentState: CurrentState, data: SubjectSchema) => {
    try {
        await prisma.subject.create({
            data: {
                name: data.name,
                teachers: {
                    connect: data.teachers.map((teacherId) => ({ id: teacherId }))
                }
            }
        })
        return { success: true, error: false };
    } catch (error) {
        console.log(error)
        return { success: false, error: true };
    }
}

export const updateSubject = async (currentState: CurrentState, data: SubjectSchema) => {
    try {
        await prisma.subject.update({
            where: { id: data.id },
            data: {
                name: data.name,
                teachers: {
                    set: data.teachers.map((teacherId) => ({ id: teacherId }))
                }
            }
        })
        return { success: true, error: false };
    } catch (error) {
        console.log(error)
        return { success: false, error: true };
    }
}

export const deleteSubject = async (currentState: CurrentState, data: FormData) => {
    const id = data.get("id") as string;
    try {
        await prisma.subject.delete({
            where: { id: parseInt(id) },
        })
        return { success: true, error: false };
    } catch (error) {
        console.log(error)
        return { success: false, error: true };
    }
}

// class action
export const createClass = async (currentState: CurrentState, data: ClassSchema) => {
    try {
        
        const { supervisorId, id, ...restData } = data;

        // Make sure to use 'gradeId' instead of 'gradId'
        const createData = {
            ...restData,
            gradeId: data.gradId, // Correct field name as per Prisma schema
            supervisorId: supervisorId ?? null, // Set supervisorId to null if it's undefined
        };

        // Prisma will automatically generate 'id', so we don't need to pass it
        await prisma.class.create({
            data: createData // Pass the correct data with 'gradeId'
        });


        // const classData = {...data}
        // if (classData.id === undefined) {
        //     delete classData.id;
        // }
        // await prisma.class.create({
        //     data: classData
        // })
        return { success: true, error: false };
    } catch (error) {
        console.log(error)
        return { success: false, error: true };
    }
}

export const updateClass = async (currentState: CurrentState, data: ClassSchema) => {
    try {
        await prisma.class.update({
            where: { id: data.id },
            data: {
                
            }
        })
        return { success: true, error: false };
    } catch (error) {
        console.log(error)
        return { success: false, error: true };
    }
}

export const deleteClass = async (currentState: CurrentState, data: FormData) => {
    const id = data.get("id") as string;
    try {
        await prisma.class.delete({
            where: { id: parseInt(id) },
        })
        return { success: true, error: false };
    } catch (error) {
        console.log(error)
        return { success: false, error: true };
    }
}