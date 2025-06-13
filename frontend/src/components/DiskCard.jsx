import React from 'react';
import { HardDrive } from 'lucide-react';
import { useStats } from '../backend-connector';
import VerdictChip from './VerdictChip';
import Sparkline from './Sparkline';

const DiskCard = () => {
  const { data } = useStats();
  const disk = data?.usage?.disk || {};

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <HardDrive size={20} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Disk Usage</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last 24 Hours {disk.trend || ''}{disk.change || 0}%
            </p>
            {disk.totalGB && disk.usedGB && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {disk.usedGB.toFixed(1)}GB / {disk.totalGB.toFixed(1)}GB
              </p>
            )}
          </div>
        </div>
        <VerdictChip value={disk.current || 0} type="disk" />
      </div>

      <div className="mb-4">  
        <div className="text-3xl font-bold text-gray-900 dark:text-white">  
          {disk.current || 0}%  
        </div>  
        <div className={`text-sm ${disk.trend === '+' ? 'text-red-500' : 'text-green-500'}`}>  
          {disk.trend || ''}{disk.change || 0}%  
        </div>  
      </div>  

      <Sparkline data={disk.history || []} color="stroke-purple-500" />  
        
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">  
        <span>00:00</span>  
        <span>04:00</span>  
        <span>08:00</span>  
        <span>12:00</span>  
        <span>16:00</span>  
        <span>20:00</span>  
        <span>24:00</span>  
      </div>  
    </div>
  );
};

export default DiskCard;
