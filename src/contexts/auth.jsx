import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useLogin, useSignUp } from '@/api/hooks/user'
import { UserService } from '@/api/services/user'
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage'

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
  signOut: () => {},
  isInitializign: true,
})

export const useAuthContext = () => useContext(AuthContext)

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken)
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken)
}

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [isInitializign, setIsInitializign] = useState(true)

  const signupMutation = useSignUp()
  const loginMutation = useLogin()

  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        setUser(createdUser)
        setTokens(createdUser.tokens)

        toast.success('Conta criada com sucesso!')
      },
      onError: () => {
        toast.error('Error ao criar conta, tente novamente mais tarde.')
      },
    })
  }

  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loggedUser) => {
        setUser(loggedUser)
        setTokens(loggedUser.tokens)

        toast.success('Login efetuado com sucesso!')
      },
      onError: () => {
        toast.error('Error ao logar na conta, tente novamente mais tarde.')
      },
    })
  }

  const signOut = () => {
    setUser(null)
    removeTokens()
  }

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializign(true)
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        )

        if (!accessToken && !refreshToken) return

        const response = await UserService.me()

        setUser(response)
      } catch (error) {
        setUser(null)
        console.error(error)
      } finally {
        setIsInitializign(false)
      }
    }
    init()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: user,
        login: login,
        signup: signup,
        signOut: signOut,
        isInitializign: isInitializign,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
