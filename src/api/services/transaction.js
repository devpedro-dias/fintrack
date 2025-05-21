import { protectedApi } from '@/lib/axios'

export const TransactionService = {
  /**
   * Create a transaction for authenticated user
   * @param {Object} input - Transaction data
   * @param {string} input.name - Transaction name
   * @param {number} input.amount - Transaction amount
   * @param {string} input.date - Transaction date
   * @param {string} input.type - Transaction type (EARNING, EXPENSE, INVESTMENT)
   *
   * @returns {Object} Transaction created
   */
  create: async (input) => {
    const response = await protectedApi.post('/transactions/me', input)
    return response.data
  },
}
