import { z } from 'zod'

export const addTransactionFormSchema = z.object({
  name: z
    .string({
      message: 'O nome é obrigatório.',
    })
    .trim()
    .min(1, {
      message: 'O nome é obrigatório.',
    }),
  amount: z.number({
    required_error: 'O valor é obrigatório.',
  }),
  date: z.date({
    required_error: 'A data é obrigatória.',
  }),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'], {
    required_error: 'O tipo é obrigatório.',
  }),
})
