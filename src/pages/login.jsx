import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'

import api from '@/lib/axios'

import PasswordInput from '../components/password-input'
import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form'
import { Input } from '../components/ui/input'
import { loginSchema } from '../schemas/login-schema'

const LoginPage = () => {
  const [user, setUser] = useState(null)
  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data) => {
      const response = await api.post('/auth/login', {
        email: data.email,
        password: data.password,
      })

      return response.data
    },
  })

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loggedUser) => {
        const accessToken = loggedUser.tokens.accessToken
        const refreshToken = loggedUser.tokens.refreshToken

        setUser(loggedUser)
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

        toast.success('Login efetuado com sucesso!')
      },
      onError: () => {
        toast.error('Error ao logar na conta, tente novamente mais tarde.')
      },
    })
  }

  useEffect(() => {
    const init = async () => {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')

      if (!accessToken && !refreshToken) return
      try {
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        setUser(response.data)
      } catch (error) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        console.error(error)
      }
    }

    init()
  }, [])

  if (user) return <div>Logado como: {user.first_name}</div>
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3 overflow-x-hidden">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Card className="w-[400px] max-w-md">
            <CardHeader>
              <CardTitle>Faça login</CardTitle>
              <CardDescription>
                Entre com sua conta inserindo seus dados abaixo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Digite sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Fazer login</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-center text-sm opacity-50">
          Ainda não possui uma conta?
        </p>
        <Button variant="link" asChild>
          <Link to="/signup">Crie sua conta</Link>
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
