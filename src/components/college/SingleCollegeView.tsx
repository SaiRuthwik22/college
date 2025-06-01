
import React from 'react';
import { Button } from '@/components/ui/button';
import { Book } from 'lucide-react';
import { College } from '@/data/mockColleges';
import Carousel from '@/components/Carousel';
import CollegeInfo from './CollegeInfo';
import CollegeCompare from '@/components/CollegeCompare';

interface SingleCollegeViewProps {
  collegeData: College;
  onJoinClick: () => void;
  onCompare: (college: College) => void;
}

const SingleCollegeView: React.FC<SingleCollegeViewProps> = ({ 
  collegeData, 
  onJoinClick, 
  onCompare 
}) => {
  return (
    <>
      <div className="w-full h-[40vh] mb-10 rounded-xl overflow-hidden">
        <Carousel images={collegeData.images} autoPlay={true} interval={4000} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-display font-semibold">{collegeData.name}</h2>
            <div className="flex gap-3">
              <Button onClick={onJoinClick} className="btn-hover-effect">Join College</Button>
              <CollegeCompare currentCollege={collegeData} onCompare={onCompare} />
            </div>
          </div>
          
          <p className="text-lg text-foreground/80 mb-8">
            {collegeData.description}
          </p>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Available Programs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {collegeData.programs.map((program, index) => (
                <div 
                  key={index}
                  className="flex items-center p-3 rounded-lg bg-secondary/50 border border-border/40"
                >
                  <Book size={18} className="text-primary mr-2" />
                  <span>{program}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button className="btn-hover-effect" onClick={onJoinClick}>Apply Now</Button>
            <Button variant="outline" className="btn-hover-effect">Request Information</Button>
            <Button variant="outline" className="btn-hover-effect">Schedule Tour</Button>
          </div>
        </div>
        
        <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="p-6 rounded-xl bg-card border border-border/40 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">College Information</h3>
            <CollegeInfo college={collegeData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCollegeView;
