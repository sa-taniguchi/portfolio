import z from 'zod'
import '@/schema/customErrorMap'

export const createUserSchema = z.object({
    name: z.string().trim().min(1),
    email: z.string().trim().min(1).email(),
    tel: z.string().refine((value) => {return value === '' || /^\d{10}$/.test(value);}),
    textarea: z.string().trim().min(1)
    // required: z.string().trim().min(1),
})

export type CreateUser = z.TypeOf<typeof createUserSchema>


