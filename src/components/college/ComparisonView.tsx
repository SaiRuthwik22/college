
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { College } from '@/data/mockColleges';
import Carousel from '@/components/Carousel';
import CollegeInfo from './CollegeInfo';
import CollegePrograms from './CollegePrograms';
import { useNavigate } from 'react-router-dom';

interface ComparisonViewProps {
  collegeData: College;
  comparedCollege: College;
  onJoinClick: () => void;
  onCancelCompare: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({
  collegeData,
  comparedCollege,
  onJoinClick,
  onCancelCompare
}) => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display font-semibold">College Comparison</h2>
        <Button variant="ghost" onClick={onCancelCompare}>Cancel Comparison</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* First College */}
        <div>
          <div className="w-full h-[30vh] mb-6 rounded-xl overflow-hidden">
            <Carousel images={collegeData.images} autoPlay={true} interval={4000} />
          </div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{collegeData.name}</h3>
            <Button onClick={onJoinClick} className="btn-hover-effect">Join College</Button>
          </div>
          <p className="text-foreground/80 mb-6">{collegeData.description}</p>
          <div className="p-6 rounded-xl bg-card border border-border/40 shadow-sm">
            <h4 className="text-lg font-semibold mb-4">College Information</h4>
            <CollegeInfo college={collegeData} />
          </div>
        </div>
        
        {/* Second College */}
        <div>
          <div className="w-full h-[30vh] mb-6 rounded-xl overflow-hidden">
            <Carousel images={comparedCollege.images} autoPlay={true} interval={4000} />
          </div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{comparedCollege.name}</h3>
            <Button onClick={() => {
              navigate('/search', { 
                state: { 
                  searchTerm: comparedCollege.name,
                  collegeData: comparedCollege
                } 
              });
            }} className="btn-hover-effect">Join College</Button>
          </div>
          <p className="text-foreground/80 mb-6">{comparedCollege.description}</p>
          <div className="p-6 rounded-xl bg-card border border-border/40 shadow-sm">
            <h4 className="text-lg font-semibold mb-4">College Information</h4>
            <CollegeInfo college={comparedCollege} />
          </div>
        </div>
      </div>
      
      <Separator className="my-10" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Programs Comparison */}
        <CollegePrograms collegeName={collegeData.name} programs={collegeData.programs} />
        <CollegePrograms collegeName={comparedCollege.name} programs={comparedCollege.programs} />
      </div>
    </div>
  );
};

export default ComparisonView;
