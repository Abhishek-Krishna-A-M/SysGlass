import React from 'react';
import { useStats } from '../backend-connector';
import VerdictChip from './VerdictChip';
import DeviceOverviewCard from './DeviceOverviewCard';
import CPUCard from './CPUCard';
import RAMCard from './RAMCard';
import DiskCard from './DiskCard';
import NetworkInfoCard from './NetworkInfoCard';

const Dashboard = () => {
  const { data } = useStats();

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">CPU Usage</h3>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.usage?.cpu?.current || 0}%</div>
                <div className={`text-sm ${data.usage?.cpu?.trend === '+' ? 'text-green-500' : 'text-red-500'}`}>
                  {data.usage?.cpu?.trend || ''}{data.usage?.cpu?.change || 0}%
                </div>
              </div>
              <VerdictChip value={data.usage?.cpu?.current || 0} type="cpu" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">  
            <div className="flex items-center justify-between">  
              <div>  
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">RAM Usage</h3>  
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.usage?.ram?.current || 0}%</div>  
                <div className={`text-sm ${data.usage?.ram?.trend === '+' ? 'text-red-500' : 'text-green-500'}`}>  
                  {data.usage?.ram?.trend || ''}{data.usage?.ram?.change || 0}%  
                </div>  
              </div>  
              <VerdictChip value={data.usage?.ram?.current || 0} type="ram" />  
            </div>  
          </div>  
            
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">  
            <div className="flex items-center justify-between">  
              <div>  
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Disk Usage</h3>  
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.usage?.disk?.current || 0}%</div>  
                <div className={`text-sm ${data.usage?.disk?.trend === '+' ? 'text-red-500' : 'text-green-500'}`}>  
                  {data.usage?.disk?.trend || ''}{data.usage?.disk?.change || 0}%  
                </div>  
              </div>  
              <VerdictChip value={data.usage?.disk?.current || 0} type="disk" />  
            </div>  
          </div>  
        </div>  

        {/* Main Content Grid */}  
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">  
          {/* Left Column - Device Overview */}  
          <div className="lg:col-span-1">  
            <DeviceOverviewCard />  
          </div>  

          {/* Middle Columns - System Usage */}  
          <div className="lg:col-span-2">  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">  
              <CPUCard />  
              <RAMCard />  
            </div>  
            <DiskCard />  
          </div>  

          {/* Right Column - Network Info */}  
          <div className="lg:col-span-1">  
            <NetworkInfoCard />  
          </div>  
        </div>  
      </div>  
    </div>
  );
};

export default Dashboard;
