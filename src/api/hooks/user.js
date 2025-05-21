import { useQuery } from '@tanstack/react-query'

import { UserService } from '@/api/services/user'
import { useAuthContext } from '@/contexts/auth'

export const getUserBalanceQueryKey = ({ userId, from, to }) => {
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
