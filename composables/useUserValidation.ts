import { createUserSchema, type CreateUser } from '@/schema/user'
import { ZodError } from 'zod'

export const useCreateUserValidation = () => {
    const errorMessages = ref<ZodError | null>(null)
    const validate = (data: CreateUser) => {
        try {
        createUserSchema.parse(data)
        if(errorMessages.value) {
            errorMessages.value = null
        }
        } catch(e) {
        if(e instanceof ZodError) {
            errorMessages.value = e
        }
        }
    }

    return {
        errorMessages,
        validate
    }
}