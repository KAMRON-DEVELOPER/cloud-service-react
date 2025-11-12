import { api } from './api';
import type { Balance, Transaction } from '@/features/types';

export const billingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBalance: builder.query<Balance, void>({
      query: () => 'balance',
      providesTags: ['Balance'],
    }),
    getTransactions: builder.query<{ data: Transaction[]; total: number }, void>({
      query: () => 'transactions',
      providesTags: ['Transaction'],
    }),
  }),
});

export const { useGetBalanceQuery, useGetTransactionsQuery } = billingApi;
