// src/components/BackgroundMesh.tsx
import React from 'react';

const BackgroundMesh: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-white">
      {/* 1. Top Left - Light Blue */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob"
        style={{ background: 'radial-gradient(circle, #D8EEFF 0%, rgba(255,255,255,0) 70%)' }}
      ></div>

      {/* 2. Top Right - Cyan */}
      <div 
        className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-2000"
        style={{ background: 'radial-gradient(circle, #DCFFFF 0%, rgba(255,255,255,0) 70%)' }}
      ></div>

      {/* 3. Top Center - Violet */}
      <div 
        className="absolute top-[-20%] left-[20%] right-[20%] w-[600px] h-[600px] mx-auto rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-4000"
        style={{ background: 'radial-gradient(circle, #F2E8FF 0%, rgba(255,255,255,0) 70%)' }}
      ></div>

      {/* 4. Bottom Left - Cyan */}
      <div 
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob"
        style={{ background: 'radial-gradient(circle, #E6FCFF 0%, rgba(255,255,255,0) 70%)' }}
      ></div>

      {/* 5. Bottom Right - Blue */}
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-4000"
        style={{ background: 'radial-gradient(circle, #EEF0FF 0%, rgba(255,255,255,0) 70%)' }}
      ></div>
    </div>
  );
};

export default BackgroundMesh;