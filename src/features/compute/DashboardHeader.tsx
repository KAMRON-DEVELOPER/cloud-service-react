import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  projectName: string;
  onProjectNameUpdate: (name: string) => void;
}

export const DashboardHeader = ({ projectName, onProjectNameUpdate }: DashboardHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(projectName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editedName.trim() && editedName !== projectName) {
      onProjectNameUpdate(editedName.trim());
    } else {
      setEditedName(projectName);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(projectName);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <header className='border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10'>
      <div className='flex h-16 items-center gap-4 px-6'>
        <div className='flex items-center gap-2 flex-1'>
          {isEditing ? (
            <>
              <Input
                ref={inputRef}
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={handleKeyDown}
                className='h-9 max-w-md font-semibold text-lg'
                placeholder='Project name'
              />
              <Button
                size='sm'
                variant='ghost'
                onClick={handleSave}
                className='h-9 w-9 p-0 text-primary hover:text-primary hover:bg-primary/10'>
                <Check className='h-4 w-4' />
              </Button>
              <Button
                size='sm'
                variant='ghost'
                onClick={handleCancel}
                className='h-9 w-9 p-0 text-muted-foreground hover:text-foreground'>
                <X className='h-4 w-4' />
              </Button>
            </>
          ) : (
            <>
              <h1 className='text-lg font-semibold'>{projectName}</h1>
              <Button
                size='sm'
                variant='ghost'
                onClick={() => setIsEditing(true)}
                className={cn(
                  'h-9 w-9 p-0 opacity-0 hover:opacity-100 transition-opacity',
                  'group-hover:opacity-100 text-muted-foreground hover:text-primary hover:bg-primary/10'
                )}>
                <Edit2 className='h-4 w-4' />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
