import { Loader2Icon } from 'lucide-react'
import { Link, Navigate } from 'react-router'

import { useAuthContext } from '@/contexts/auth'
import { useLoginForm } from '@/forms/hooks/user'

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

const LoginPage = () => {
  const { user, login, isInitializign } = useAuthContext()

  const { form } = useLoginForm()

  const handleSubmit = (data) => login(data)

  if (isInitializign) return null

  if (user) return <Navigate to="/" />

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3 overflow-x-hidden">
      <h1>{user}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-[400px] max-w-md">
            <CardHeader>
              <CardTitle>Faça login</CardTitle>
              <CardDescription>
                Entre com sua conta inserindo seus dados abaixo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
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
                control={form.control}
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
              <Button className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2Icon className="mr-1 animate-spin" />
                )}
                Fazer login
              </Button>
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
