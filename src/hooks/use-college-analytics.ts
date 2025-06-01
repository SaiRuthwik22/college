
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { logCollegeView, logSearchQuery } from '@/lib/analytics';

export function useCollegeAnalytics(searchTerm?: string, collegeData?: any) {
  // Generate a temporary user ID for anonymous tracking
  const tempUserId = 
    typeof window !== 'undefined' ? 
    localStorage.getItem('tempUserId') || uuidv4() : 
    uuidv4();
  
  useEffect(() => {
    // Store temp user ID in localStorage
    if (typeof window !== 'undefined' && !localStorage.getItem('tempUserId')) {
      localStorage.setItem('tempUserId', tempUserId);
    }
    
    // Log search query when component mounts
    if (searchTerm) {
      logSearchQuery({
        query: searchTerm,
        userId: localStorage.getItem('userId') || tempUserId,
      });
    }
    
    // Log college view when component mounts
    if (collegeData && collegeData.id) {
      logCollegeView({
        collegeId: collegeData.id,
        userId: localStorage.getItem('userId') || tempUserId,
      });
    }
  }, [searchTerm, collegeData, tempUserId]);

  return tempUserId;
}
