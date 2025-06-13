import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const VerdictChip = ({ value, type = 'cpu' }) => {
  const getVerdict = () => {
    if (type === 'cpu' || type === 'ram') {
      if (value < 50) return { 
        label: 'Good', 
        icon: CheckCircle, 
        color: 'text-green-500 bg-green-100 dark:bg-green-900/20 dark:text-green-400' 
      };
      if (value < 80) return { 
        label: 'High Usage', 
        icon: AlertTriangle, 
        color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400' 
      };
      return { 
        label: 'Critical', 
        icon: XCircle, 
        color: 'text-red-500 bg-red-100 dark:bg-red-900/20 dark:text-red-400' 
      };
    }
    if (type === 'disk') {
      if (value < 70) return { 
        label: 'Good', 
        icon: CheckCircle, 
        color: 'text-green-500 bg-green-100 dark:bg-green-900/20 dark:text-green-400' 
      };
      if (value < 90) return { 
        label: 'High Usage', 
        icon: AlertTriangle, 
        color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400' 
      };
      return { 
        label: 'Critical', 
        icon: XCircle, 
        color: 'text-red-500 bg-red-100 dark:bg-red-900/20 dark:text-red-400' 
      };
    }
    return { 
      label: 'Good', 
      icon: CheckCircle, 
      color: 'text-green-500 bg-green-100 dark:bg-green-900/20 dark:text-green-400' 
    };
  };

  const verdict = getVerdict();
  const Icon = verdict.icon;

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${verdict.color}`}>
      <Icon size={12} />
      {verdict.label}
    </div>
  );
};

export default VerdictChip;
