import React from 'react';
import { Activity } from 'lucide-react';
import { useStats } from '../backend-connector';
import VerdictChip from './VerdictChip';
import Sparkline from './Sparkline';

const RAMCard = () => {
  const { data } = useStats();
  const ram = data?.usage?.ram || {};

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <Activity size={20} className="text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">RAM Usage</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last 24 Hours {ram.trend || ''}{ram.change || 0}%
            </p>
            {ram.totalGB && ram.usedGB && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {ram.usedGB.toFixed(1)}GB / {ram.totalGB.toFixed(1)}GB
              </p>
            )}
          </div>
        </div>
        <VerdictChip value={ram.current || 0} type="ram" />
      </div>

      <div className="mb-4">  
        <div className="text-3xl font-bold text-gray-900 dark:text-white">  
          {ram.current || 0}%  
        </div>  
        <div className={`text-sm ${ram.trend === '+' ? 'text-red-500' : 'text-green-500'}`}>  
          {ram.trend || ''}{ram.change || 0}%  
        </div>  
      </div>  

      <Sparkline data={ram.history || []} color="stroke-green-500" />  
        
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

export default RAMCard;
