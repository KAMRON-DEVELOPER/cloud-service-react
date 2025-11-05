// src/services/compute.ts
import { api } from './api';
import type {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
  Deployment,
  CreateDeploymentRequest,
  UpdateDeploymentRequest,
  DeploymentEvent,
} from '@/features/types';

export const computeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Projects
    getProjects: builder.query<{ projects: Project[]; total: number }, void>({
      query: () => ({
        url: `/compute/projects`,
      }),
      providesTags: ['Project'],
    }),
    getProject: builder.query<Project, string>({
      query: (id) => ({
        url: `/compute/project/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: 'Project', id }],
    }),
    createProject: builder.mutation<Project, CreateProjectRequest>({
      query: (body) => ({
        url: `/compute/projects`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation<Project, { id: string; data: UpdateProjectRequest }>({
      query: ({ id, data }) => ({
        url: `/compute/project/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Project', id }, 'Project'],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/compute/project/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),

    // Deployments
    getDeployments: builder.query<{ deployments: Deployment[]; total: number }, { projectId?: string }>({
      query: (params) => {
        const qs = new URLSearchParams();
        if (params.projectId) qs.set('projectId', params.projectId);
        return {
          url: `/compute/deployments${qs.toString() ? `?${qs.toString()}` : ''}`,
        };
      },
      providesTags: ['Deployment'],
    }),
    getDeployment: builder.query<Deployment, string>({
      query: (id) => ({
        url: `/compute/deployment/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: 'Deployment', id }],
    }),
    createDeployment: builder.mutation<Deployment, CreateDeploymentRequest>({
      query: (body) => ({
        url: `/compute/deployments`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deployment'],
    }),
    updateDeployment: builder.mutation<Deployment, { id: string; data: UpdateDeploymentRequest }>({
      query: ({ id, data }) => ({
        url: `/compute/deployment/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Deployment', id }, 'Deployment'],
    }),
    deleteDeployment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/compute/deployment/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Deployment'],
    }),

    // Deployment Events
    getDeploymentEvents: builder.query<{ events: DeploymentEvent[]; total: number }, string>({
      query: (deploymentId) => ({
        url: `/compute/deployment/${deploymentId}/events`,
      }),
      providesTags: (_result, _error, deploymentId) => [{ type: 'DeploymentEvent', id: deploymentId }],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetDeploymentsQuery,
  useGetDeploymentQuery,
  useCreateDeploymentMutation,
  useUpdateDeploymentMutation,
  useDeleteDeploymentMutation,
  useGetDeploymentEventsQuery,
} = computeApi;
