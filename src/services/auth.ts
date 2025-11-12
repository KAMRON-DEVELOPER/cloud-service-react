import type { OAuthUser, Tokens, User } from '@/features/types';
import { api } from '@/services/api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => 'profile',
    }),
    updateProfile: builder.mutation<User, User>({
      query: (body) => ({ url: 'profile', method: 'PATCH', body: body }),
      invalidatesTags: ['Auth'],
    }),
    deleteProfile: builder.mutation<void, void>({
      query: () => ({ url: 'profile', method: 'DELETE' }),
      invalidatesTags: ['Auth'],
    }),
    continueWithEmail: builder.mutation<User, { email: string; password: string }>({
      query: (body) => ({
        url: 'auth/email',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    getOAuthUser: builder.query<OAuthUser, void>({
      query: () => '/auth/user',
      providesTags: ['Auth'],
    }),
    completeProfile: builder.mutation<User, FormData>({
      query: (body) => ({
        url: 'auth/complete',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    refreshToken: builder.mutation<Tokens, void>({
      query: () => ({
        url: 'auth/refresh',
        method: 'POST',
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useContinueWithEmailMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useGetOAuthUserQuery,
  useCompleteProfileMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi;
