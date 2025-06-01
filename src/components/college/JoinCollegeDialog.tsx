
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import JoinCollegeForm from './JoinCollegeForm';

interface JoinCollegeDialogProps {
  collegeName: string;
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (name: string) => void;
}

const JoinCollegeDialog: React.FC<JoinCollegeDialogProps> = ({ 
  collegeName, 
  userId,
  open, 
  onOpenChange,
  onSuccess
}) => {
  const handleSuccess = (name: string) => {
    onSuccess(name);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Join {collegeName}</DialogTitle>
          <DialogDescription>
            Fill out this form to express your interest in joining {collegeName}.
          </DialogDescription>
        </DialogHeader>
        
        <JoinCollegeForm 
          collegeName={collegeName} 
          userId={userId} 
          onClose={() => onOpenChange(false)}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export default JoinCollegeDialog;
