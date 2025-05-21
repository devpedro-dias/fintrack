import { useMutation, useQuery } from '@tanstack/react-query'

import { UserService } from '@/api/services/user'
import { useAuthContext } from '@/contexts/auth'

export const getUserBalanceQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['balance', userId]
  }

  return ['balance', userId, from, to]
}
export const useGetUserBalance = ({ from, to }) => {
  const { user } = useAuthContext()
  return useQuery({
    queryKey: ['balance', user.id, from, to],
    queryFn: () => {
      return UserService.getBalance({ from, to })
    },
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
    staleTime: 1000 * 60 * 5,
  })
}

export const signUpMutationKey = ['signup']

export const useSignUp = () => {
  return useMutation({
    mutationKey: signUpMutationKey,
    mutationFn: async (data) => {
      const response = await UserService.signup(data)
      return response
    },
  })
}

export const loginMutationKey = ['login']

export const useLogin = () => {
  return useMutation({
    mutationKey: loginMutationKey,
    mutationFn: async (data) => {
      const response = await UserService.login(data)
      return response
    },
  })
}
