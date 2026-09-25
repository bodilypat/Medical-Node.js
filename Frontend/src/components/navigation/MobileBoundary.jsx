/* *************************************************** */
/* File: #src/components/navigation/MobileBoundary.jsx */
/* *************************************************** */

import React, { useEffect, useState } from 'react';

const MobileBoundary = ({
  children,
  breakpoint = 768,
  className = '',
  contentClassName = '',
  ariaLabel = 'Mobile boundary',
}) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return (
    <div
      className={`mobile-boundary ${isMobile ? 'mobile' : 'desktop'} ${className}`.trim()}
      data-mobile={isMobile}
      aria-label={ariaLabel}
      style={{
        width: '100%',
        display: 'block',
        boxSizing: 'border-box',
      }}
    >
      <div
        className={`mobile-boundary__content ${contentClassName}`.trim()}
        style={{
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileBoundary;
