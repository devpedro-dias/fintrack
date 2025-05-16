import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'

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
import { Checkbox } from '../components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form'
import { Input } from '../components/ui/input'
import { useAuthContext } from '../contexts/auth'
import { signupSchema } from '../schemas/signup-schema'

const SignupPage = () => {
  const { user, signup } = useAuthContext()

  const methods = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  })

  const handleSubmit = (data) => signup(data)

  if (user) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-3 overflow-x-hidden">
        <h1 className="text-2xl font-bold">
          Seja bem vindo, {user.first_name}
        </h1>
        <Link to="/login">Ir para login</Link>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3 overflow-x-hidden">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Card className="w-[400px] max-w-md">
            <CardHeader>
              <CardTitle>Crie sua conta</CardTitle>
              <CardDescription>Insira suas informações abaixo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={methods.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primeiro Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmação de senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Digite sua senha novamente"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="leading-none">
                      <FormLabel
                        className={`text-xs font-medium text-muted-foreground opacity-75 ${methods.formState.errors.terms ? 'text-destructive' : ''}`}
                      >
                        Ao clicar em &ldquo;Criar Conta&ldquo;{' '}
                        <Link
                          className={`"text-white underline ${
                            methods.formState.errors.terms
                              ? 'text-destructive'
                              : ''
                          }`}
                          to="#"
                        >
                          você aceita com nosso termo de uso e política de
                          privacidade
                        </Link>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Criar conta</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-center text-sm opacity-50">Já possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/login">Faça Login</Link>
        </Button>
      </div>
    </div>
  )
}

export default SignupPage
