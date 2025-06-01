
import React from 'react';
import { Book } from 'lucide-react';

interface CollegeProgramsProps {
  collegeName: string;
  programs: string[];
}

const CollegePrograms: React.FC<CollegeProgramsProps> = ({ collegeName, programs }) => {
  return (
    <div className="p-6 rounded-xl bg-card border border-border/40 shadow-sm">
      <h4 className="text-lg font-semibold mb-4">{collegeName} Programs</h4>
      <div className="space-y-2">
        {programs.map((program, index) => (
          <div key={index} className="flex items-center p-2 rounded-lg bg-secondary/50">
            <Book size={16} className="text-primary mr-2" />
            <span>{program}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollegePrograms;
