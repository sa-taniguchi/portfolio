import { createUserSchemaName, type CreateUserName } from '@/schema/user'
import { createUserSchemaEmail, type CreateUserEmail } from '@/schema/user'
import { createUserSchemaTel, type CreateUserTel } from '@/schema/user'
import { createUserSchemaTextarea, type createUserTextarea } from '@/schema/user'
import { ZodError } from 'zod'

export const useCreateUserValidationName = () => {
    const errorMessagesName = ref<ZodError | null>(null)
    const validateName = (data: CreateUserName) => {
        try {
        createUserSchemaName.parse(data)
        if(errorMessagesName.value) {
            errorMessagesName.value = null
        }
        } catch(e) {
        if(e instanceof ZodError) {
            errorMessagesName.value = e
        }
        }
    }

    return {
        errorMessagesName,
        validateName
    }
}

export const useCreateUserValidationEmail = () => {
    const errorMessagesEmail = ref<ZodError | null>(null)
    const validateEmail = (data: CreateUserEmail) => {
        try {
        createUserSchemaEmail.parse(data)
        if(errorMessagesEmail.value) {
            errorMessagesEmail.value = null
        }
        } catch(e) {
        if(e instanceof ZodError) {
            errorMessagesEmail.value = e
        }
        }
    }

    return {
        errorMessagesEmail,
        validateEmail
    }
}

export const useCreateUserValidationTel = () => {
    const errorMessagesTel = ref<ZodError | null>(null)
    const validateTel = (data: CreateUserTel) => {
        try {
        createUserSchemaTel.parse(data)
        if(errorMessagesTel.value) {
            errorMessagesTel.value = null
        }
        } catch(e) {
        if(e instanceof ZodError) {
            errorMessagesTel.value = e
        }
        }
    }

    return {
        errorMessagesTel,
        validateTel
    }
}

export const useCreateUserValidationTextarea = () => {
    const errorMessagesTextarea = ref<ZodError | null>(null)
    const validateTextarea = (data: createUserTextarea) => {
        try {
        createUserSchemaTextarea.parse(data)
        if(errorMessagesTextarea.value) {
            errorMessagesTextarea.value = null
        }
        } catch(e) {
        if(e instanceof ZodError) {
            errorMessagesTextarea.value = e
        }
        }
    }

    return {
        errorMessagesTextarea,
        validateTextarea
    }
}