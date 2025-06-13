import React from 'react';
import { Cpu } from 'lucide-react';
import { useStats } from '../backend-connector';
import VerdictChip from './VerdictChip';
import Sparkline from './Sparkline';

const CPUCard = () => {
  const { data } = useStats();
  const cpu = data?.usage?.cpu || {};

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Cpu size={20} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">CPU Usage</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last 24 Hours {cpu.trend || ''}{cpu.change || 0}%
            </p>
            {cpu.status && cpu.status === "Unsupported" && (
              <p className="text-xs text-yellow-500 dark:text-yellow-400">Status: {cpu.status}</p>
            )}
          </div>
        </div>
        <VerdictChip value={cpu.current || 0} type="cpu" />
      </div>

      <div className="mb-4">  
        <div className="text-3xl font-bold text-gray-900 dark:text-white">  
          {cpu.current || 0}%  
        </div>  
        <div className={`text-sm ${cpu.trend === '+' ? 'text-green-500' : 'text-red-500'}`}>  
          {cpu.trend || ''}{cpu.change || 0}%  
        </div>  
      </div>  

      <Sparkline data={cpu.history || []} color="stroke-blue-500" />  
        
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

export default CPUCard;
