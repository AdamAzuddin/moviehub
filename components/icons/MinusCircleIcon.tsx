import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const MinusCircleIcon: React.FC<IconProps> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="currentColor" 
    {...props}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <rect x="6" y="11" width="12" height="2" fill="currentColor" />
  </svg>
);

export default MinusCircleIcon;
