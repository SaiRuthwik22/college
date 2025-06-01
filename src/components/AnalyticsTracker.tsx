
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { logWebsiteVisit } from '@/lib/analytics';
import { v4 as uuidv4 } from 'uuid';

interface AnalyticsTrackerProps {
  children: React.ReactNode;
}

const AnalyticsTracker: React.FC<AnalyticsTrackerProps> = ({ children }) => {
  const location = useLocation();
  const [tempUserId] = useState(() => localStorage.getItem('tempUserId') || uuidv4());
  
  useEffect(() => {
    // Store temp user ID in localStorage if not already present
    if (!localStorage.getItem('tempUserId')) {
      localStorage.setItem('tempUserId', tempUserId);
    }
    
    // Log page visit for each route change
    const logVisit = async () => {
      await logWebsiteVisit({
        userId: localStorage.getItem('userId') || tempUserId,
      });
    };
    
    logVisit();
  }, [location.pathname, tempUserId]);
  
  return <>{children}</>;
};

export default AnalyticsTracker;
