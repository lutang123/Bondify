import React from 'react';
import { Link } from 'wouter';

interface LogoProps {
  size?: number;
  withText?: boolean;
  className?: string;
  asLink?: boolean;
}

export default function Logo({ 
  size = 40, 
  withText = true, 
  className = "", 
  asLink = true 
}: LogoProps) {
  const logoElement = (
    <div className={`flex items-center ${className}`}>
      <div 
        className="rounded-full bg-gradient-to-r from-purple-300 to-pink-300 flex items-center justify-center overflow-hidden"
        style={{ width: size, height: size }}
      >
        <span className="text-white font-accent font-bold" style={{ fontSize: size * 0.6 }}>B</span>
      </div>
      
      {withText && (
        <span 
          className="font-accent font-semibold bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text ml-2" 
          style={{ fontSize: size * 0.8 }}
        >
          Bondify
        </span>
      )}
    </div>
  );

  if (asLink) {
    return <Link href="/">{logoElement}</Link>;
  }
  
  return logoElement;
}