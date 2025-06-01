
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { College } from '@/data/mockColleges';
import NewHeader from '@/components/NewHeader';
import Footer from '@/components/Footer';
import SingleCollegeView from '@/components/college/SingleCollegeView';
import ComparisonView from '@/components/college/ComparisonView';
import JoinCollegeDialog from '@/components/college/JoinCollegeDialog';
import { useCollegeAnalytics } from '@/hooks/use-college-analytics';

const SearchedCollege = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchTerm, collegeData } = location.state || {};
  const [comparedCollege, setComparedCollege] = useState<College | null>(null);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Use the analytics hook
  const tempUserId = useCollegeAnalytics(searchTerm, collegeData);
  
  useEffect(() => {
    // If no search term or college data was provided, redirect back to the home page
    if (!searchTerm || !collegeData) {
      navigate('/');
      return;
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [searchTerm, collegeData, navigate]);
  
  if (!searchTerm || !collegeData) return null;
  
  const handleCompare = (college: College) => {
    setComparedCollege(college);
  };

  const cancelCompare = () => {
    setComparedCollege(null);
  };

  const handleJoinSuccess = (name: string) => {
    toast({
      title: "Application Submitted",
      description: `Thank you ${name}, your application for ${collegeData.name} has been received.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NewHeader />
      
      <div className="pt-20 pb-10 px-6 animate-fade-in">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to results</span>
        </button>
        
        <div className="mt-4 mb-6">
          <p className="text-sm text-muted-foreground">Search results for</p>
          <h1 className="text-2xl font-display font-semibold">"{searchTerm}"</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-16">
        {comparedCollege ? (
          <ComparisonView 
            collegeData={collegeData}
            comparedCollege={comparedCollege}
            onJoinClick={() => setJoinDialogOpen(true)}
            onCancelCompare={cancelCompare}
          />
        ) : (
          <SingleCollegeView 
            collegeData={collegeData}
            onJoinClick={() => setJoinDialogOpen(true)}
            onCompare={handleCompare}
          />
        )}
      </div>
      
      <JoinCollegeDialog 
        collegeName={collegeData.name}
        userId={localStorage.getItem('userId') || tempUserId}
        open={joinDialogOpen}
        onOpenChange={setJoinDialogOpen}
        onSuccess={handleJoinSuccess}
      />
      
      <Footer />
    </div>
  );
};

export default SearchedCollege;
