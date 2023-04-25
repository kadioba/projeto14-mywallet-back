import joi from 'joi'

export const operationSchema = joi.object({
    value: joi.number().positive().precision(2).required().messages({
        'number.base': 'O valor deve ser um número',
        'number.positive': 'O valor deve ser maior que zero',
        'number.precision': 'O valor deve ter no máximo 2 casas decimais',
        'any.required': 'O valor é obrigatório'
    }),
    description: joi.string().required().messages({
        'string.empty': 'A descrição é obrigatória',
        'any.required': 'A descrição é obrigatória'
    })
})