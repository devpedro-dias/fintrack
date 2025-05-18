import { protectedApi, publicAPi } from '@/lib/axios'

export const UserService = {
  /**
   * Create a new user
   * @param {Object} input - User data
   * @param {string} input.firstName - User first name
   * @param {string} input.lastName - User last name
   * @param {string} input.email - User email
   * @param {string} input.password - User password
   *
   * @returns {Object} User created
   * @returns {string} response.tokens - User authentication tokens
   */
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
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      tokens: response.data.tokens,
    }
  },
  /**
   * Authenticate a user
   * @param {Object} input - User data
   * @param {string} input.email - User email
   * @param {string} input.password - User password
   *
   * @returns {Object} Authenticated user
   * @returns {string} response.tokens - User authentication tokens
   */
  login: async (input) => {
    const response = await publicAPi.post('/auth/login', {
      email: input.email,
      password: input.password,
    })

    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      tokens: response.data.tokens,
    }
  },
  /**
   * Returns the authenticated user

   * @returns {Object} Authenticated user
   */
  me: async () => {
    const response = await protectedApi.get('/users/me')
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
    }
  },
}
