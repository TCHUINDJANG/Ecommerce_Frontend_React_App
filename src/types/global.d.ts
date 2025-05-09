declare module '*.svg' {
    import React from 'react';
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement> & { className?: string }>;
    const src: string;
    export default src;
  }