import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCreateTransaction } from '@/api/hooks/transaction'
import { addTransactionFormSchema } from '@/forms/schemas/transaction'

export const useCreateTransactionForm = ({ onSuccess, onError }) => {
  const { mutateAsync: createTransaction } = useCreateTransaction()
  const form = useForm({
    resolver: zodResolver(addTransactionFormSchema),
    defaultValues: {
      name: '',
      amount: 0,
      date: new Date(),
      type: 'EARNING',
    },
    shouldUnregister: true,
  })

  const onSubmit = async (data) => {
    try {
      await createTransaction(data)
      onSuccess()
    } catch (error) {
      console.error(error)
      onError()
    }
  }

  return { form, onSubmit }
}
