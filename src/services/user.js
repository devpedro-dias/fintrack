import { protectedApi, publicAPi } from '@/lib/axios'

export const UserService = {
  signup: async (input) => {
    const response = await protectedApi.post('/users', {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    })

    return {
      id: response.data.id,
      email: response.data.email,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      tokens: response.data.tokens,
    }
  },

  login: async (input) => {
    const response = await publicAPi.post('/auth/login', {
      email: input.email,
      password: input.password,
    })

    return {
      id: response.data.id,
      email: response.data.email,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      tokens: response.data.tokens,
    }
  },
  me: async () => {
    const response = await protectedApi.get('/users/me')
    return {
      id: response.data.id,
      email: response.data.email,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
    }
  },
}
