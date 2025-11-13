import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface CreateDeploymentDialogProps {
  onCreateDeployment: (deployment: { name: string; image: string; envVars: Record<string, string>; secrets: Record<string, string> }) => void;
}

export const CreateDeploymentDialog = ({ onCreateDeployment }: CreateDeploymentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [envVars, setEnvVars] = useState<Array<{ key: string; value: string }>>([]);
  const [secrets, setSecrets] = useState<Array<{ key: string; value: string }>>([]);
  const [newEnvKey, setNewEnvKey] = useState('');
  const [newEnvValue, setNewEnvValue] = useState('');
  const [newSecretKey, setNewSecretKey] = useState('');
  const [newSecretValue, setNewSecretValue] = useState('');

  const handleAddEnvVar = () => {
    if (newEnvKey.trim() && newEnvValue.trim()) {
      setEnvVars([...envVars, { key: newEnvKey.trim(), value: newEnvValue.trim() }]);
      setNewEnvKey('');
      setNewEnvValue('');
    }
  };

  const handleAddSecret = () => {
    if (newSecretKey.trim() && newSecretValue.trim()) {
      setSecrets([...secrets, { key: newSecretKey.trim(), value: newSecretValue.trim() }]);
      setNewSecretKey('');
      setNewSecretValue('');
    }
  };

  const handleRemoveEnvVar = (index: number) => {
    setEnvVars(envVars.filter((_, i) => i !== index));
  };

  const handleRemoveSecret = (index: number) => {
    setSecrets(secrets.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!name.trim() || !image.trim()) {
      toast.error('Please provide a name and image');
      return;
    }

    const envVarsObj = envVars.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});
    const secretsObj = secrets.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});

    onCreateDeployment({
      name: name.trim(),
      image: image.trim(),
      envVars: envVarsObj,
      secrets: secretsObj,
    });

    // Reset form
    setName('');
    setImage('');
    setEnvVars([]);
    setSecrets([]);
    setOpen(false);
    toast.success('Deployment created successfully');
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='bg-gradient-primary hover:shadow-glow transition-all bg-primary'>
          <Plus className='h-4 w-4 mr-2' />
          New Deployment
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Create New Deployment</DialogTitle>
          <DialogDescription>Deploy a Docker image to your K3s cluster</DialogDescription>
        </DialogHeader>

        <div className='space-y-6 py-4'>
          {/* Basic Info */}
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Deployment Name</Label>
              <Input
                id='name'
                placeholder='my-app'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='image'>Docker Image</Label>
              <Input
                id='image'
                placeholder='nginx:latest or ghcr.io/username/repo:tag'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>

          {/* Environment Variables */}
          <div className='space-y-3'>
            <Label>Environment Variables</Label>
            <div className='flex gap-2'>
              <Input
                placeholder='Key'
                value={newEnvKey}
                onChange={(e) => setNewEnvKey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddEnvVar()}
              />
              <Input
                placeholder='Value'
                value={newEnvValue}
                onChange={(e) => setNewEnvValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddEnvVar()}
              />
              <Button
                onClick={handleAddEnvVar}
                size='sm'
                variant='secondary'>
                <Plus className='h-4 w-4' />
              </Button>
            </div>
            {envVars.length > 0 && (
              <div className='flex flex-wrap gap-2 p-3 bg-muted rounded-md'>
                {envVars.map((env, index) => (
                  <Badge
                    key={index}
                    variant='secondary'
                    className='gap-1'>
                    <span className='font-mono text-xs'>
                      {env.key}={env.value}
                    </span>
                    <button
                      onClick={() => handleRemoveEnvVar(index)}
                      className='ml-1 hover:text-destructive'>
                      <X className='h-3 w-3' />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Secrets */}
          <div className='space-y-3'>
            <Label>Secrets</Label>
            <div className='flex gap-2'>
              <Input
                placeholder='Key'
                value={newSecretKey}
                onChange={(e) => setNewSecretKey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSecret()}
              />
              <Input
                type='password'
                placeholder='Value'
                value={newSecretValue}
                onChange={(e) => setNewSecretValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSecret()}
              />
              <Button
                onClick={handleAddSecret}
                size='sm'
                variant='secondary'>
                <Plus className='h-4 w-4' />
              </Button>
            </div>
            {secrets.length > 0 && (
              <div className='flex flex-wrap gap-2 p-3 bg-muted rounded-md'>
                {secrets.map((secret, index) => (
                  <Badge
                    key={index}
                    variant='secondary'
                    className='gap-1'>
                    <span className='font-mono text-xs'>{secret.key}=••••••</span>
                    <button
                      onClick={() => handleRemoveSecret(index)}
                      className='ml-1 hover:text-destructive'>
                      <X className='h-3 w-3' />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='flex justify-end gap-2'>
          <Button
            variant='outline'
            onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className='bg-gradient-primary'>
            Create Deployment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
