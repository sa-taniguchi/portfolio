import z from 'zod'
import '@/schema/customErrorMap'

export const createUserSchemaName = z.object({
    name: z.string().trim().min(1),
})
export const createUserSchemaEmail = z.object({
    email: z.string().trim().min(1).email(),
})
export const createUserSchemaTel = z.object({
    tel: z.string().refine((value) => {return value === '' || /^\d{10}$/.test(value);}),
})
export const createUserSchemaTextarea = z.object({
    textarea: z.string().trim().min(1)
})

export type CreateUserName = z.TypeOf<typeof createUserSchemaName>
export type CreateUserEmail = z.TypeOf<typeof createUserSchemaEmail>
export type CreateUserTel = z.TypeOf<typeof createUserSchemaTel>
export type createUserTextarea = z.TypeOf<typeof createUserSchemaTextarea>