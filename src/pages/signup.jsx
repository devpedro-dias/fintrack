import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Input } from '../components/ui/input'

const SignupPage = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>Insira suas informações abaixo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Digite seu nome" />
          <Input placeholder="Digite seu sobrenome" />
          <Input placeholder="Digite seu email" />
          <div className="relative">
            <Input
              type={passwordIsVisible ? 'text' : 'password'}
              placeholder="Digite sua senha"
            />
            <Button
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground"
              variant="ghost"
              onClick={() => setPasswordIsVisible((prev) => !prev)}
            >
              {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Criar conta</Button>
        </CardFooter>
      </Card>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Ja possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/login">Faça Login</Link>
        </Button>
      </div>
    </div>
  )
}

export default SignupPage
