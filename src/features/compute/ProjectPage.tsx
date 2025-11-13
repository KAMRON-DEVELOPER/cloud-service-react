import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from 'lucide-react';
import { CreateDeploymentDialog } from './CreateDeploymentDialog';
import { DeploymentCard } from './DeploymentCard';
import { DashboardHeader } from './DashboardHeader';
import { useCreateDeploymentMutation, useGetDeploymentsQuery, useGetProjectQuery, useUpdateProjectMutation } from '@/services/compute';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const ProjectPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  // Redirect if route param is missing
  useEffect(() => {
    if (!projectId) navigate('/dashboard');
  }, [projectId, navigate]);

  // Queries
  const { data: project, error: projectError, isLoading: isProjectLoading } = useGetProjectQuery(projectId!, { skip: !projectId });

  const { data: deployments, error: deploymentsError, isLoading: isDeploymentsLoading } = useGetDeploymentsQuery(projectId!, { skip: !projectId });

  const [updateProject, { isLoading: updateProjectIsLoading, error: updateProjectError }] = useUpdateProjectMutation();

  const [createDeployment, { isLoading: createDeploymentIsLoading, error: createDeploymentError }] = useCreateDeploymentMutation();

  // Project name update handler
  const handleProjectNameUpdate = async (name: string) => {
    if (!projectId) return;

    try {
      await updateProject({ projectId, data: { name } }).unwrap();
      toast.success('Project name updated successfully');
    } catch (err: any) {
      console.error('Failed to update project name:', err);

      // Extract error message
      let errorMessage = 'Failed to update project name';
      if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (err?.data?.detail) {
        errorMessage = err.data.detail;
      } else if (err?.message) {
        errorMessage = err.message;
      }

      toast.error(errorMessage);
    }
  };

  const onCreateDeployment = async (data: { name: string; image: string; envVars: Record<string, string>; secrets: Record<string, string> }) => {
    console.log('Creating deployment:', data);

    // export interface CreateDeploymentRequest {
    //   projectId: string;
    //   name: string;
    //   image: string;
    //   envVars?: Record<string, string>;
    //   replicas?: number;
    //   resources?: Partial<ResourceSpec>;
    //   labels?: Record<string, string>;
    //   nodeSelector?: Record<string, string>;
    // }

    await createDeployment({ projectId, data }).unwrap();
  };

  // Unified loading state
  if (isProjectLoading || isDeploymentsLoading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen text-blue-400'>
        <p>Loading project data...</p>
      </div>
    );
  }

  // Unified error handling
  const error = projectError || deploymentsError;
  if (error) {
    let errorMessage = 'Something went wrong while loading project data.';

    if ('status' in error) {
      const err = error as { status: number; data?: any };
      errorMessage += ` (Status: ${err.status})`;

      if (err.data) {
        const msg = typeof err.data === 'string' ? err.data : err.data.message || err.data.detail;
        if (msg) errorMessage += `: ${msg}`;
      }
    } else if ('message' in error) {
      errorMessage += `: ${(error as any).message}`;
    }

    return (
      <div className='flex flex-col items-center justify-center min-h-screen text-red-500'>
        <p className='text-lg font-semibold text-center max-w-md'>{errorMessage}</p>
        <button
          onClick={() => navigate('/dashboard')}
          className='mt-4 px-4 py-2 border border-red-500 rounded hover:bg-red-500 hover:text-white transition-colors'>
          Go Back to Dashboard
        </button>
      </div>
    );
  }

  // Handle empty project or data edge case
  if (!project || !deployments) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen text-yellow-300'>
        <p>Project or deployment data not available.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className='mt-4 px-4 py-2 border border-yellow-400 rounded hover:bg-yellow-400 hover:text-black transition-colors'>
          Go Back
        </button>
      </div>
    );
  }

  // Normal render
  return (
    <div className='min-h-screen'>
      <div className='group'>
        <DashboardHeader
          projectName={project.name}
          onProjectNameUpdate={handleProjectNameUpdate}
          isUpdating={updateProjectIsLoading}
        />
      </div>

      <main className='container mx-auto p-6 space-y-8'>
        {/* Stats section (placeholder) */}
        <div className='grid gap-4 md:grid-cols-3'>{deployments.data.length !== 0 && <p>Stats available soon.</p>}</div>

        {/* Deployments section */}
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-2xl font-bold text-primary'>Deployments</h2>
              <p className='text-sm text-muted-foreground'>Manage your containerized applications</p>
            </div>
            <CreateDeploymentDialog onCreateDeployment={onCreateDeployment} />
          </div>

          {deployments.data.length === 0 ? (
            <Card className='border-dashed'>
              <CardContent className='flex flex-col items-center justify-center py-12'>
                <Container className='h-12 w-12 text-muted-foreground mb-4' />
                <h3 className='text-lg font-semibold mb-1'>No deployments yet</h3>
                <p className='text-sm text-muted-foreground mb-4'>Create your first deployment to get started</p>
              </CardContent>
            </Card>
          ) : (
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {deployments.data.map((deployment) => (
                <DeploymentCard
                  key={deployment.id}
                  deployment={deployment}
                  onDelete={(id) => console.log(`Delete deployment: ${id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectPage;
