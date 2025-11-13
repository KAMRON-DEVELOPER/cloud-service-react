import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, Check, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  projectName: string;
  onProjectNameUpdate: (name: string) => void;
  isUpdating?: boolean;
}

export const DashboardHeader = ({ projectName, onProjectNameUpdate, isUpdating = false }: DashboardHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(projectName);
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Close editing mode when update completes
  useEffect(() => {
    if (!isUpdating && isEditing) {
      setIsEditing(false);
    }
  }, [isUpdating]);

  // Update local state when projectName changes
  useEffect(() => {
    setEditedName(projectName);
  }, [projectName]);

  const handleSave = () => {
    if (editedName.trim() && editedName !== projectName) {
      onProjectNameUpdate(editedName.trim());
      // Don't close editing mode here - let the useEffect handle it after update completes
    } else {
      setEditedName(projectName);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedName(projectName);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isUpdating) {
      handleSave();
    } else if (e.key === 'Escape' && !isUpdating) {
      handleCancel();
    }
  };

  return (
    <header className='bg-primary border-b backdrop-blur-sm sticky top-0 z-10'>
      <div className='flex h-16 items-center gap-4 px-6'>
        <div className='flex items-center gap-2 flex-1'>
          {isEditing ? (
            <>
              <Input
                ref={inputRef}
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={isUpdating ? undefined : handleSave}
                disabled={isUpdating}
                className='h-8 font-semibold'
                style={{
                  width: spanRef.current ? `${Math.max(spanRef.current.offsetWidth + 40, 200)}px` : '200px',
                }}
              />
              <span
                ref={spanRef}
                className='absolute invisible whitespace-pre font-semibold'
                aria-hidden='true'>
                {editedName}
              </span>
              <Button
                size='sm'
                variant='ghost'
                onClick={handleSave}
                disabled={isUpdating}
                className='h-9 w-9 p-0 text-primary hover:text-primary hover:bg-primary/10'>
                {isUpdating ? <Loader2 className='h-4 w-4 animate-spin' /> : <Check className='h-4 w-4' />}
              </Button>
              <Button
                size='sm'
                variant='ghost'
                onClick={handleCancel}
                disabled={isUpdating}
                className='h-9 w-9 p-0 text-muted-foreground hover:text-foreground'>
                <X className='h-4 w-4' />
              </Button>
            </>
          ) : (
            <>
              <h1
                className='text-lg font-semibold text-primary'
                onDoubleClick={() => !isUpdating && setIsEditing(true)}>
                {projectName}
              </h1>
              <Button
                size='sm'
                variant='ghost'
                onClick={() => setIsEditing(true)}
                disabled={isUpdating}
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
