"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { classSchema, ClassSchema, subjectSchema, SubjectSchema } from "@/lib/formValidationSchemas";
import { createClass, createSubject, updateClass, updateSubject } from "@/lib/actions";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ClassForm = ({
    type,
    data,
    setOpen,
    relatedData
}: {
    type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    relatedData?: any;
}) => {
    const [fileName, setFileName] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ClassSchema>({
        resolver: zodResolver(classSchema),
    });

    const [state, formAction] = useFormState(type === "create" ? createClass : updateClass, { success: false, error: false })

    const onSubmit = handleSubmit((data) => {
        formAction(data);
    });

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(`Subject has been ${type === "create" ? "created" : "updated"}!`)
            setOpen(false)
            router.refresh();
        }
    }, [state])

    // const { teachers } = relatedData;
    const { teachers = [], grades = [] } = relatedData || {};

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">{type === "create" ? "Create a new class" : "Update the class"}</h1>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Class Name"
                    name="name"
                    defaultValue={data?.name}
                    register={register}
                    error={errors?.name}
                />
                <InputField
                    label="Capacity"
                    name="name"
                    defaultValue={data?.capacity}
                    register={register}
                    error={errors?.capacity}
                />
                {data && <InputField
                    label="Id"
                    name="id"
                    defaultValue={data?.id}
                    register={register}
                    error={errors?.id}
                    className={'hidden'}
                />}
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Supervisor</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("supervisorId")}
                        defaultValue={data?.supervisorId || ""}
                        // defaultValue={data?.teachers || []}
                    >
                        {
                            teachers.map((teacher: { id: string; name: string; surname: string }) => (
                                <option value={teacher.id} key={teacher.id}> {teacher.name + " " + teacher.surname} </option>
                            ))
                        }
                    </select>
                    {errors?.supervisorId?.message && (
                        <p className="text-xs text-red-400">
                            {errors.supervisorId.message.toString()}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Grade</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("gradId")}
                        defaultValue={data?.gradeId || ""}
                    >
                        {
                            grades.map((grade: { id: number; level: number }) => (
                                <option value={grade.id} key={grade.id}> {grade.level} </option>
                            ))
                        }
                    </select>
                    {errors?.gradId?.message && (
                        <p className="text-xs text-red-400">
                            {errors.gradId.message.toString()}
                        </p>
                    )}
                </div>
            </div>
            {state.error && <span className="text-red-500">Something went wrong!</span>}
            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
}

export default ClassForm;