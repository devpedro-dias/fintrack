import { Card, CardContent } from './ui/card'

const BalanceItem = ({ label, icon, amount }) => {
  return (
    <Card>
      <CardContent className="space-y-2 p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
            {icon}
          </div>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
        <p className="text-2xl font-semibold">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(amount)}
        </p>
      </CardContent>
    </Card>
  )
}

export default BalanceItem
