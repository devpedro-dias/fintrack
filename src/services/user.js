import { protectedApi, publicAPi } from '@/lib/axios'

export const UserService = {
  signup: async (input) => {
    const repsonse = await protectedApi.post('/users', {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    })

    return repsonse.data
  },

  login: async (input) => {
    const repsonse = await publicAPi.post('/auth/login', {
      email: input.email,
      password: input.password,
    })

    return repsonse.data
  },
}
