/* src/components/GradientIcon.jsx */
import React from 'react';

const GradientIcon = ({ icon, id }) => {
  const IconComponent = icon;

  return (
    <svg width="3rem" height="3rem" viewBox="0 0 24 24">
      <defs>
        {}
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#b84182ff' }} />
          <stop offset="100%" style={{ stopColor: '#F8EBE4' }} />
        </linearGradient>
      </defs>
      {}
      <IconComponent fill={`url(#${id})`} size="100%" />
    </svg>
  );
};

export default GradientIcon;