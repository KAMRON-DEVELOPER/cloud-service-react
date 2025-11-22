import { useState, type FC } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import type { CreateDeploymentRequest } from '../types';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface CreateDeploymentDialogProps {
  onCreateDeployment: (data: CreateDeploymentRequest) => Promise<void>;
}

interface EnvVar {
  key: string;
  value: string;
}

interface Secret {
  key: string;
  value: string;
}

const CreateDeploymentDialog: FC<CreateDeploymentDialogProps> = ({ onCreateDeployment }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [port, setPort] = useState('3000');
  const [replicas, setReplicas] = useState('1');
  const [subdomain, setSubdomain] = useState('');

  // Advanced options
  const [cpuRequest, setCpuRequest] = useState('250');
  const [cpuLimit, setCpuLimit] = useState('500');
  const [memoryRequest, setMemoryRequest] = useState('256');
  const [memoryLimit, setMemoryLimit] = useState('512');

  // Environment variables and secrets
  const [envVars, setEnvVars] = useState<EnvVar[]>([{ key: '', value: '' }]);
  const [secrets, setSecrets] = useState<Secret[]>([{ key: '', value: '' }]);

  const resetForm = () => {
    setName('');
    setImage('');
    setPort('3000');
    setReplicas('1');
    setSubdomain('');
    setCpuRequest('250');
    setCpuLimit('500');
    setMemoryRequest('256');
    setMemoryLimit('512');
    setEnvVars([{ key: '', value: '' }]);
    setSecrets([{ key: '', value: '' }]);
  };

  const addEnvVar = () => {
    setEnvVars([...envVars, { key: '', value: '' }]);
  };

  const removeEnvVar = (index: number) => {
    setEnvVars(envVars.filter((_, i) => i !== index));
  };

  const updateEnvVar = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...envVars];
    updated[index][field] = value;
    setEnvVars(updated);
  };

  const addSecret = () => {
    setSecrets([...secrets, { key: '', value: '' }]);
  };

  const removeSecret = (index: number) => {
    setSecrets(secrets.filter((_, i) => i !== index));
  };

  const updateSecret = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...secrets];
    updated[index][field] = value;
    setSecrets(updated);
  };

  const validateForm = (): string | null => {
    if (!name.trim()) return 'Deployment name is required';
    if (name.length > 128) return 'Deployment name must be less than 128 characters';
    if (!image.trim()) return 'Container image is required';
    if (image.length > 500) return 'Image URL must be less than 500 characters';

    const portNum = parseInt(port);
    if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
      return 'Port must be between 1 and 65535';
    }

    const replicasNum = parseInt(replicas);
    if (isNaN(replicasNum) || replicasNum < 1 || replicasNum > 10) {
      return 'Replicas must be between 1 and 10';
    }

    // Validate subdomain if provided
    if (subdomain.trim()) {
      const subdomainRegex = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/;
      if (!subdomainRegex.test(subdomain.trim())) {
        return 'Subdomain must contain only lowercase letters, numbers, and hyphens';
      }
      if (subdomain.length < 3 || subdomain.length > 63) {
        return 'Subdomain must be between 3 and 63 characters';
      }
    }

    // Validate resource limits
    const cpuReq = parseInt(cpuRequest);
    const cpuLim = parseInt(cpuLimit);
    const memReq = parseInt(memoryRequest);
    const memLim = parseInt(memoryLimit);

    if (isNaN(cpuReq) || cpuReq < 1) return 'CPU request must be at least 1 millicore';
    if (isNaN(cpuLim) || cpuLim < cpuReq) return 'CPU limit must be greater than or equal to request';
    if (isNaN(memReq) || memReq < 1) return 'Memory request must be at least 1 MB';
    if (isNaN(memLim) || memLim < memReq) return 'Memory limit must be greater than or equal to request';

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsLoading(true);

    try {
      // Build env vars object (only non-empty entries)
      const envVarsObj: Record<string, string> = {};
      envVars.forEach(({ key, value }) => {
        if (key.trim() && value.trim()) {
          envVarsObj[key.trim()] = value.trim();
        }
      });

      // Build secrets object (only non-empty entries)
      const secretsObj: Record<string, string> = {};
      secrets.forEach(({ key, value }) => {
        if (key.trim() && value.trim()) {
          secretsObj[key.trim()] = value.trim();
        }
      });

      const deploymentData: CreateDeploymentRequest = {
        name: name.trim(),
        image: image.trim(),
        port: parseInt(port),
        replicas: parseInt(replicas),
        envVars: Object.keys(envVarsObj).length > 0 ? envVarsObj : undefined,
        secrets: Object.keys(secretsObj).length > 0 ? secretsObj : undefined,
        resources: {
          cpuRequestMillicores: parseInt(cpuRequest),
          cpuLimitMillicores: parseInt(cpuLimit),
          memoryRequestMb: parseInt(memoryRequest),
          memoryLimitMb: parseInt(memoryLimit),
        },
        subdomain: subdomain.trim() || undefined,
      };

      await onCreateDeployment(deploymentData);

      toast.success('Deployment created successfully!');
      setOpen(false);
      resetForm();
    } catch (error: any) {
      console.error('Failed to create deployment:', error);

      // Extract error message
      let errorMessage = 'Failed to create deployment';
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.data?.detail) {
        errorMessage = error.data.detail;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='h-4 w-4 mr-2' />
          New Deployment
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Create New Deployment</DialogTitle>
          <DialogDescription>Deploy a containerized application to your Kubernetes cluster</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className='space-y-6'>
          {/* Basic Configuration */}
          <div className='space-y-4'>
            <h3 className='text-sm font-medium'>Basic Configuration</h3>

            <div className='grid gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Deployment Name *</Label>
                <Input
                  id='name'
                  placeholder='my-app'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='image'>Container Image *</Label>
                <Input
                  id='image'
                  placeholder='nginx:latest or registry.example.com/my-app:v1.0'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='port'>Container Port *</Label>
                  <Input
                    id='port'
                    type='number'
                    placeholder='3000'
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    disabled={isLoading}
                    min='1'
                    max='65535'
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='replicas'>Replicas *</Label>
                  <Input
                    id='replicas'
                    type='number'
                    placeholder='1'
                    value={replicas}
                    onChange={(e) => setReplicas(e.target.value)}
                    disabled={isLoading}
                    min='1'
                    max='10'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='subdomain'>Custom Subdomain (optional)</Label>
                <Input
                  id='subdomain'
                  placeholder='my-app (will be my-app.poddle.uz)'
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                  disabled={isLoading}
                />
                <p className='text-xs text-muted-foreground'>Leave empty to auto-generate. Must be lowercase, alphanumeric with hyphens.</p>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className='space-y-4'>
            <h3 className='text-sm font-medium'>Resource Limits</h3>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='cpuRequest'>CPU Request (millicores)</Label>
                <Input
                  id='cpuRequest'
                  type='number'
                  value={cpuRequest}
                  onChange={(e) => setCpuRequest(e.target.value)}
                  disabled={isLoading}
                  min='1'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='cpuLimit'>CPU Limit (millicores)</Label>
                <Input
                  id='cpuLimit'
                  type='number'
                  value={cpuLimit}
                  onChange={(e) => setCpuLimit(e.target.value)}
                  disabled={isLoading}
                  min='1'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='memoryRequest'>Memory Request (MB)</Label>
                <Input
                  id='memoryRequest'
                  type='number'
                  value={memoryRequest}
                  onChange={(e) => setMemoryRequest(e.target.value)}
                  disabled={isLoading}
                  min='1'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='memoryLimit'>Memory Limit (MB)</Label>
                <Input
                  id='memoryLimit'
                  type='number'
                  value={memoryLimit}
                  onChange={(e) => setMemoryLimit(e.target.value)}
                  disabled={isLoading}
                  min='1'
                />
              </div>
            </div>
          </div>

          {/* Environment Variables */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-medium'>Environment Variables</h3>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={addEnvVar}
                disabled={isLoading}>
                <Plus className='h-3 w-3 mr-1' />
                Add
              </Button>
            </div>

            <div className='space-y-2'>
              {envVars.map((envVar, index) => (
                <div
                  key={index}
                  className='flex gap-2'>
                  <Input
                    placeholder='KEY'
                    value={envVar.key}
                    onChange={(e) => updateEnvVar(index, 'key', e.target.value)}
                    disabled={isLoading}
                  />
                  <Input
                    placeholder='value'
                    value={envVar.value}
                    onChange={(e) => updateEnvVar(index, 'value', e.target.value)}
                    disabled={isLoading}
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    onClick={() => removeEnvVar(index)}
                    disabled={isLoading}>
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Secrets */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-medium'>Secrets (Encrypted)</h3>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={addSecret}
                disabled={isLoading}>
                <Plus className='h-3 w-3 mr-1' />
                Add
              </Button>
            </div>

            <div className='space-y-2'>
              {secrets.map((secret, index) => (
                <div
                  key={index}
                  className='flex gap-2'>
                  <Input
                    placeholder='SECRET_KEY'
                    value={secret.key}
                    onChange={(e) => updateSecret(index, 'key', e.target.value)}
                    disabled={isLoading}
                  />
                  <Input
                    type='password'
                    placeholder='secret value'
                    value={secret.value}
                    onChange={(e) => updateSecret(index, 'value', e.target.value)}
                    disabled={isLoading}
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    onClick={() => removeSecret(index)}
                    disabled={isLoading}>
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
              disabled={isLoading}>
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isLoading}>
              {isLoading && <Loader2 className='h-4 w-4 mr-2 animate-spin' />}
              Create Deployment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDeploymentDialog;
