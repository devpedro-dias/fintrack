import { z } from 'zod'

export const signupSchema = z
  .object({
    firstName: z
      .string({
        message: 'O primeiro nome é obrigatório.',
      })
      .trim()
      .min(1, {
        message: 'O primeiro nome é obrigatório.',
      }),
    lastName: z
      .string({
        message: 'O sobrenome é obrigatório.',
      })
      .trim()
      .min(1, {
        message: 'O sobrenome é obrigatório.',
      }),
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
        message: 'A senha deve ter no mínimo 6 caracteres.',
      }),
    confirmPassword: z
      .string({
        message: 'A confirmação de senha é obrigatória.',
      })
      .trim()
      .min(6, {
        message: 'A confirmação de senha é obrigatória.',
      }),
    terms: z.boolean().refine((value) => value === true, {
      message: 'Aceitar o termo de uso é obrigatório.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais.',
    path: ['confirmPassword'],
  })

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
