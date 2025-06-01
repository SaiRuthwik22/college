import React from 'react';
import BackButton from '@/components/HomeButton';

const OpenCourses = () => (
  <div className="min-h-screen bg-bg-light flex flex-col items-center justify-start py-16 px-4">
    <BackButton />
    <h1 className="text-3xl font-bold text-primary mb-4">Open Courses</h1>
    <p className="text-lg text-secondary max-w-2xl text-center">
      Explore a variety of open courses and online learning opportunities to enhance your skills and knowledge at your own pace.
    </p>
  </div>
);

export default OpenCourses; 