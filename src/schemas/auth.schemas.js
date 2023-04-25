import joi from 'joi'

export const userSchema = joi.object({
    name: joi.string().required().messages({
        'string.empty': 'O nome é obrigatório',
        'any.required': 'O nome é obrigatório'
    }),
    password: joi.string().required().min(3).messages({
        'string.empty': 'A senha é obrigatória',
        'string.min': 'A senha deve conter pelo menos {#limit} caracteres',
        'any.required': 'A senha é obrigatória'
    }),
    email: joi.string().required().email().messages({
        'string.email': 'O email informado não é válido',
        'string.empty': 'O email é obrigatório',
        'any.required': 'O email é obrigatório'
    })
})

export const loginSchema = joi.object({
    email: joi.string().required().email().messages({
        'string.email': 'O email informado não é válido',
        'any.required': 'O email é obrigatório'
    }),
    password: joi.string().required().min(3).messages({
        'string.min': 'A senha deve ter pelo menos {#limit} caracteres',
        'any.required': 'A senha é obrigatória'
    })
})