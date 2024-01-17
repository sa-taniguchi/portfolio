import z from 'zod'

export const createUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().min(1).email(),
    tel: z.number(),
    textarea: z.string().min(1)
})

export type CreateUser = z.TypeOf<typeof createUserSchema>