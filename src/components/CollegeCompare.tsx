
import React, { useState } from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { College, getComparisonColleges } from '@/data/mockColleges';

interface CollegeCompareProps {
  currentCollege: College;
  onCompare: (comparedCollege: College) => void;
}

const CollegeCompare: React.FC<CollegeCompareProps> = ({ currentCollege, onCompare }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [colleges, setColleges] = useState<College[]>([]);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const fetchColleges = async () => {
    setIsLoading(true);
    try {
      /* 
      // COMMENTED: Real API call implementation
      const response = await fetch('https://api.example.com/colleges');
      const data = await response.json();
      */
      
      // MOCK DATA: Using mock colleges for the comparison
      const comparisonColleges = getComparisonColleges(currentCollege.id);
      
      setColleges(comparisonColleges);
    } catch (error) {
      console.error('Error fetching colleges:', error);
      toast({
        title: "Failed to load colleges",
        description: "There was an error loading the colleges list.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      fetchColleges();
    }
  };

  const handleSelectCollege = (college: College) => {
    onCompare(college);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="btn-hover-effect">
          Compare
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="end">
        <div className="p-4 border-b">
          <h3 className="font-medium">Compare with another college</h3>
          <p className="text-sm text-muted-foreground">Select a college to compare with {currentCollege.name}</p>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center p-6">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="p-2">
              {colleges.map((college) => (
                <button
                  key={college.id}
                  className="w-full text-left p-3 hover:bg-secondary rounded-md transition-colors mb-1 flex flex-col"
                  onClick={() => handleSelectCollege(college)}
                >
                  <span className="font-medium">{college.name}</span>
                  <span className="text-sm text-muted-foreground">{college.location}</span>
                </button>
              ))}
            </div>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default CollegeCompare;
