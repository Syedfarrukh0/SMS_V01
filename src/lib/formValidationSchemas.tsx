import { z } from "zod";

export const subjectSchema = z.object({
    id: z.coerce.number().optional(),
    name: z
        .string()
        .min(3, { message: "Subject name is required!" }),
    teachers: z.array(z.string()) // teacher ids
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
    id: z.coerce.number().optional(),
    name: z
        .string()
        .min(3, { message: "Subject name is required!" }),
    capacity: z.coerce.number().min(3, { message: "Capacity name is required!" }),
    gradId: z.coerce.number().min(3, { message: "Grade name is required!" }),
    supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;