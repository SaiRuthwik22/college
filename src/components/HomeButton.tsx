import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button
      className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background text-primary font-medium shadow-sm transition-colors hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 mb-4"
      onClick={() => navigate(-1)}
      type="button"
    >
      <ArrowLeft size={18} />
      <span>Back</span>
    </button>
  );
};

export default BackButton; 