import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { mockColleges, College } from '@/data/mockColleges';
import NewHeader from '@/components/NewHeader';
import Footer from '@/components/Footer';

const CollegeCard = ({ college }: { college: College }) => {
  const navigate = useNavigate();
  
  const handleCollegeClick = () => {
    navigate('/search', { 
      state: { 
        searchTerm: college.name,
        collegeData: college
      } 
    });
  };
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer" onClick={handleCollegeClick}>
      <div className="h-44 overflow-hidden">
        <img 
          src={college.images[0]} 
          alt={college.name} 
          className="w-full h-full object-cover transform transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{college.name}</h3>
          <div className="flex items-center bg-secondary/50 px-2 py-1 rounded text-sm">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span>{college.rating}</span>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1 mb-1">
            <GraduationCap className="h-4 w-4" />
            <span>College Code: {college.code}</span>
          </div>
          <div>{college.location}</div>
        </div>
        
        <p className="text-sm mb-3 line-clamp-2">{college.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{college.tuitionFee}</span>
          <Button variant="outline" size="sm" className="text-white bg-[#0D9488] border-[#0D9488] hover:bg-[#0f766e] hover:border-[#0f766e] transition-colors">
            Details <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const OpenDegree = () => {
  return (
    <div className="min-h-screen bg-background mt-16">
      <NewHeader />
      <div className="container mx-auto pt-4 pb-16 px-4">
        <div className=" mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">Open Degree Programs</h1>
          <p className="text-muted-foreground max-w-2xl ">
            Explore top colleges offering flexible open degree programs designed to fit your schedule and career goals.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OpenDegree;
