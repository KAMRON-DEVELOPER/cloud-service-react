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
    getProjects: builder.query<{ data: Project[]; total: number }, void>({
      query: () => ({
        url: `projects`,
      }),
      providesTags: ['Project'],
    }),
    getProject: builder.query<Project, string>({
      query: (projectId) => ({
        url: `projects/${projectId}`,
      }),
      providesTags: (_result, _error, id) => [{ type: 'Project', id }],
    }),
    createProject: builder.mutation<Project, CreateProjectRequest>({
      query: (body) => ({
        url: `projects`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation<Project, { projectId: string; data: UpdateProjectRequest }>({
      query: ({ projectId, data }) => ({
        url: `projects/${projectId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { projectId }) => [{ type: 'Project', projectId }, 'Project'],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (projectId) => ({
        url: `projects/${projectId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),

    // Deployments
    getDeployments: builder.query<{ data: Deployment[]; total: number }, string>({
      query: (projectId) => ({
        url: `projects/${projectId}/deployments`,
      }),
      providesTags: ['Deployment'],
    }),
    getDeployment: builder.query<Deployment, { projectId: string; deploymentId: string }>({
      query: ({ projectId, deploymentId }) => ({
        url: `projects/${projectId}/deployments/${deploymentId}`,
      }),
      providesTags: (_result, _error, deploymentId) => [{ type: 'Deployment', deploymentId }],
    }),
    createDeployment: builder.mutation<Deployment, { projectId: string; data: CreateDeploymentRequest }>({
      query: ({ projectId, data }) => ({
        url: `projects/${projectId}/deployments`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { projectId }) => [{ type: 'Deployment', projectId }, 'Deployment'],
    }),
    updateDeployment: builder.mutation<Deployment, { projectId: string; deploymentId: string; data: UpdateDeploymentRequest }>({
      query: ({ projectId, deploymentId, data }) => ({
        url: `projects/${projectId}/deployments/${deploymentId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { projectId, deploymentId }) => [{ type: 'Deployment', projectId, deploymentId }, 'Deployment'],
    }),
    deleteDeployment: builder.mutation<void, { projectId: string; deploymentId: string }>({
      query: ({ projectId, deploymentId }) => ({
        url: `projects/${projectId}/deployments/${deploymentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Deployment'],
    }),

    // Deployment Events
    getDeploymentEvents: builder.query<{ events: DeploymentEvent[]; total: number }, string>({
      query: (deploymentId) => ({
        url: `deployment/${deploymentId}/events`,
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
