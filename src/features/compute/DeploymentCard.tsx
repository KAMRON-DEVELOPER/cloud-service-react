import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreVertical, Play, Square, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Deployment {
  id: string;
  name: string;
  image: string;
  status: 'pending' | 'running' | 'succeeded' | 'failed' | 'terminated';
  replicas: number;
  envVars: Record<string, string>;
  createdAt: string;
}

interface DeploymentCardProps {
  deployment: Deployment;
  onStart?: (id: string) => void;
  onStop?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const statusConfig = {
  pending: { label: 'Pending', className: 'bg-muted text-muted-foreground' },
  running: { label: 'Running', className: 'bg-primary/10 text-primary border-primary/20' },
  succeeded: { label: 'Succeeded', className: 'bg-green-500/10 text-green-500 border-green-500/20' },
  failed: { label: 'Failed', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  terminated: { label: 'Terminated', className: 'bg-muted text-muted-foreground' },
};

export const DeploymentCard = ({ deployment, onStart, onStop, onDelete }: DeploymentCardProps) => {
  const status = statusConfig[deployment.status];
  const envCount = Object.keys(deployment.envVars).length;

  return (
    <Card className='group hover:shadow-md transition-all duration-200 hover:border-primary/50 relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity' />
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between'>
          <div className='space-y-1 flex-1'>
            <CardTitle className='text-base font-semibold'>{deployment.name}</CardTitle>
            <CardDescription className='text-xs font-mono'>{deployment.image}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className='h-8 w-8 p-0'>
                <MoreVertical className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {deployment.status !== 'running' && onStart && (
                <DropdownMenuItem onClick={() => onStart(deployment.id)}>
                  <Play className='h-4 w-4 mr-2' />
                  Start
                </DropdownMenuItem>
              )}
              {deployment.status === 'running' && onStop && (
                <DropdownMenuItem onClick={() => onStop(deployment.id)}>
                  <Square className='h-4 w-4 mr-2' />
                  Stop
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(deployment.id)}
                  className='text-destructive'>
                  <Trash2 className='h-4 w-4 mr-2' />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-2 flex-wrap'>
          <Badge
            variant='outline'
            className={cn('text-xs', status.className)}>
            {status.label}
          </Badge>
          <Badge
            variant='secondary'
            className='text-xs'>
            {deployment.replicas} {deployment.replicas === 1 ? 'replica' : 'replicas'}
          </Badge>
          {envCount > 0 && (
            <Badge
              variant='secondary'
              className='text-xs'>
              {envCount} env {envCount === 1 ? 'var' : 'vars'}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
