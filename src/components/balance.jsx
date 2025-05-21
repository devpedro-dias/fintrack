import { useQuery } from '@tanstack/react-query'
import { PiggyBank, TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useAuthContext } from '@/contexts/auth'
import { UserService } from '@/services/user'

import BalanceItem from './balance-item'

const Balance = () => {
  const [searchParams] = useSearchParams()

  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { user } = useAuthContext()
  const { data } = useQuery({
    queryKey: ['balance', user.id, from, to],
    queryFn: () => {
      return UserService.getBalance({ from, to })
    },
    enabled: !!from && !!to,
  })

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <BalanceItem
        label="Saldo"
        amount={data?.balance}
        icon={<Wallet size={16} />}
      />
      <BalanceItem
        label="Ganhos"
        amount={data?.earnings}
        icon={<TrendingUp className="text-primary-green" size={16} />}
      />
      <BalanceItem
        label="Gastos"
        amount={data?.expenses}
        icon={<TrendingDown className="text-primary-red" size={16} />}
      />
      <BalanceItem
        label="Investimentos"
        amount={data?.investments}
        icon={<PiggyBank className="text-primary-blue" size={16} />}
      />
    </div>
  )
}

export default Balance
