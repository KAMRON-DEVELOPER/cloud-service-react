import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container, Server, Layers } from 'lucide-react';
import { CreateDeploymentDialog } from './CreateDeploymentDialog';
import { DeploymentCard } from './DeploymentCard';
import { DashboardHeader } from './DashboardHeader';

interface Deployment {
  id: string;
  name: string;
  image: string;
  status: 'pending' | 'running' | 'succeeded' | 'failed' | 'terminated';
  replicas: number;
  envVars: Record<string, string>;
  createdAt: string;
}

const ProjectPage = () => {
  const [projectName, setProjectName] = useState('My PaaS Project');
  const [deployments, setDeployments] = useState<Deployment[]>([
    {
      id: '1',
      name: 'web-app',
      image: 'nginx:latest',
      status: 'running',
      replicas: 2,
      envVars: { PORT: '80', ENV: 'production' },
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'api-service',
      image: 'node:18-alpine',
      status: 'running',
      replicas: 3,
      envVars: { NODE_ENV: 'production', PORT: '3000' },
      createdAt: new Date().toISOString(),
    },
  ]);

  const handleCreateDeployment = (data: { name: string; image: string; envVars: Record<string, string>; secrets: Record<string, string> }) => {
    const newDeployment: Deployment = {
      id: Date.now().toString(),
      name: data.name,
      image: data.image,
      status: 'pending',
      replicas: 1,
      envVars: data.envVars,
      createdAt: new Date().toISOString(),
    };
    setDeployments([newDeployment, ...deployments]);
  };

  const stats = [
    {
      title: 'Total Deployments',
      value: deployments.length.toString(),
      icon: Container,
      description: 'Active containers',
    },
    {
      title: 'Running',
      value: deployments.filter((d) => d.status === 'running').length.toString(),
      icon: Layers,
      description: 'Healthy services',
    },
    {
      title: 'Total Replicas',
      value: deployments.reduce((sum, d) => sum + d.replicas, 0).toString(),
      icon: Server,
      description: 'Across all deployments',
    },
  ];

  return (
    <div className='min-h-screen bg-background'>
      <div className='group'>
        <DashboardHeader
          projectName={projectName}
          onProjectNameUpdate={setProjectName}
        />
      </div>

      <main className='container mx-auto p-6 space-y-8'>
        {/* Stats */}
        <div className='grid gap-4 md:grid-cols-3'>
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className='relative overflow-hidden border-border/50 hover:border-primary/50 transition-colors'>
              <div className='absolute inset-0 bg-gradient-primary opacity-[0.02]' />
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium text-muted-foreground'>{stat.title}</CardTitle>
                <stat.icon className='h-4 w-4 text-primary' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{stat.value}</div>
                <p className='text-xs text-muted-foreground mt-1'>{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Deployments Section */}
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-2xl font-bold'>Deployments</h2>
              <p className='text-sm text-muted-foreground'>Manage your containerized applications</p>
            </div>
            <CreateDeploymentDialog onCreateDeployment={handleCreateDeployment} />
          </div>

          {deployments.length === 0 ? (
            <Card className='border-dashed'>
              <CardContent className='flex flex-col items-center justify-center py-12'>
                <Container className='h-12 w-12 text-muted-foreground mb-4' />
                <h3 className='text-lg font-semibold mb-1'>No deployments yet</h3>
                <p className='text-sm text-muted-foreground mb-4'>Create your first deployment to get started</p>
                <CreateDeploymentDialog onCreateDeployment={handleCreateDeployment} />
              </CardContent>
            </Card>
          ) : (
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {deployments.map((deployment) => (
                <DeploymentCard
                  key={deployment.id}
                  deployment={deployment}
                  onDelete={(id) => setDeployments(deployments.filter((d) => d.id !== id))}
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
