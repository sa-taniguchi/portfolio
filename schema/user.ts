import z from 'zod'

// バリデーション内容

export const nameSchema = z.string().trim().min(1)
export const emailSchema = z.string().trim().min(1).email()
export const telSchema = z.string().refine((value) => {return value === '' || /^\d{9,12}$/.test(value.replace(/[-\s]/g, ''));})
export const textareaSchema = z.string().trim().min(1)

export const formSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    tel: telSchema,
    textarea: textareaSchema
})