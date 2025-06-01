
import React from 'react';
import { MapPin, Calendar, Users, Award, Building } from 'lucide-react';
import { College } from '@/data/mockColleges';

interface CollegeInfoProps {
  college: College;
}

const CollegeInfo: React.FC<CollegeInfoProps> = ({ college }) => (
  <div className="space-y-4">
    <div className="flex items-start gap-3">
      <MapPin size={20} className="text-primary mt-0.5" />
      <div>
        <p className="font-medium">Location</p>
        <p className="text-foreground/70">{college.location}</p>
      </div>
    </div>
    
    <div className="flex items-start gap-3">
      <Calendar size={20} className="text-primary mt-0.5" />
      <div>
        <p className="font-medium">Founded</p>
        <p className="text-foreground/70">{college.founded}</p>
      </div>
    </div>
    
    <div className="flex items-start gap-3">
      <Users size={20} className="text-primary mt-0.5" />
      <div>
        <p className="font-medium">Student Body</p>
        <p className="text-foreground/70">{college.students}</p>
      </div>
    </div>
    
    <div className="flex items-start gap-3">
      <Award size={20} className="text-primary mt-0.5" />
      <div>
        <p className="font-medium">Accreditation</p>
        <p className="text-foreground/70">{college.accreditation}</p>
      </div>
    </div>
    
    <div className="flex items-start gap-3">
      <Building size={20} className="text-primary mt-0.5" />
      <div>
        <p className="font-medium">Ranking</p>
        <p className="text-foreground/70">{college.ranking}</p>
      </div>
    </div>
  </div>
);

export default CollegeInfo;
