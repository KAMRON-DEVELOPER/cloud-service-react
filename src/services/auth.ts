import type {
  CompleteProfileResponse,
  ContinueWithEmailResponse,
  GetOAuthUserResponse,
  GetUserResponse,
  RefreshTokenResponse,
  UpdateUserResponse,
  User,
} from '@/features/types';
import { api } from '@/services/api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<GetUserResponse, void>({
      query: () => 'users/profile',
    }),
    updateProfile: builder.mutation<UpdateUserResponse, User>({
      query: (body) => ({ url: 'users/profile', method: 'PATCH', body: body }),
      invalidatesTags: ['Auth'],
    }),
    deleteProfile: builder.mutation<void, void>({
      query: () => ({ url: 'users/profile', method: 'DELETE' }),
      invalidatesTags: ['Auth'],
    }),
    continueWithEmail: builder.mutation<ContinueWithEmailResponse, { email: string; password: string }>({
      query: (body) => ({
        url: 'users/auth/email',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    getOAuthUser: builder.query<GetOAuthUserResponse, void>({
      query: () => '/auth/user',
      providesTags: ['Auth'],
    }),
    completeProfile: builder.mutation<CompleteProfileResponse, FormData>({
      query: (body) => ({
        url: 'users/auth/complete',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    refreshToken: builder.mutation<RefreshTokenResponse, void>({
      query: () => ({
        url: 'users/auth/refresh',
        method: 'POST',
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'users/auth/logout',
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
