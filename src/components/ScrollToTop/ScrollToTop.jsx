import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Use instant behavior for better performance
    window.scrollTo(0, 0, { behavior: 'instant' });
  }, [location]);

  return null;
};

export default ScrollToTop;
