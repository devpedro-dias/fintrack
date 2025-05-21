import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({
      message: 'O email é obrigatório.',
    })
    .email({
      message: 'O email é inválido.',
    })
    .trim()
    .min(1, {
      message: 'O email é obrigatório.',
    }),
  password: z
    .string({
      message: 'A senha é obrigatória.',
    })
    .trim()
    .min(6, {
      message: 'A senha é obrigatória.',
    }),
})
