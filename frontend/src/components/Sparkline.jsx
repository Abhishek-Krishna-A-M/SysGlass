import React from 'react';

const Sparkline = ({ data = [], className = "h-16", color = "stroke-blue-500" }) => {
  const width = 300;
  const height = 60;
  
  if (!data || data.length === 0) {
    return (
      <div className={`w-full ${className} flex items-center justify-center`}>
        <div className="text-gray-400 dark:text-gray-600 text-sm">No data</div>
      </div>
    );
  }

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={`w-full ${className}`}>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          className={`${color} stroke-2`}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Sparkline;
