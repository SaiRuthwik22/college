import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
}

const FilterModal: React.FC<FilterModalProps> = ({ open, onOpenChange, title = 'Filters', children }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white border-none shadow-xl rounded-2xl p-8">
        <div className="flex flex-row items-center justify-between mb-4">
          <DialogTitle className="text-2xl font-bold text-primary">{title}</DialogTitle>
        </div>
        <div className="mt-2">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal; 