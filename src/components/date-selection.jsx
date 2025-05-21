import { useQueryClient } from '@tanstack/react-query'
import { addMonths, format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { useAuthContext } from '@/contexts/auth'

import { DatePickerWithRange } from './ui/date-picker-with-range'

const formatDateToQueryParams = (date) => format(date, 'yyyy-MM-dd')

const DateSelection = () => {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [date, setDate] = useState({
    from: searchParams.get('from')
      ? new Date(searchParams.get('from') + 'T00:00:00')
      : new Date(),
    to: searchParams.get('to')
      ? new Date(searchParams.get('to') + 'T00:00:00')
      : addMonths(new Date(), 1),
  })

  useEffect(() => {
    if (!date?.from || !date?.to) return

    const queryParams = new URLSearchParams()

    queryParams.set('from', formatDateToQueryParams(date.from))
    queryParams.set('to', formatDateToQueryParams(date.to))

    navigate(`/?${queryParams.toString()}`)

    queryClient.invalidateQueries({
      queryKey: [
        'balance',
        user.id,
        formatDateToQueryParams(date.from),
        formatDateToQueryParams(date.to),
      ],
    })
  }, [date, navigate, queryClient, user.id])
  return <DatePickerWithRange value={date} onChange={setDate} />
}

export default DateSelection
