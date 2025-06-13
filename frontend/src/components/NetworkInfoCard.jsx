import React from 'react';
import { Wifi } from 'lucide-react';
import { useStats } from '../backend-connector';

const NetworkInfoCard = () => {
  const { data } = useStats();
  const network = data?.network || {};

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
          <Wifi size={20} className="text-orange-600 dark:text-orange-400" />
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white">Network Info</h3>
      </div>

      <div className="space-y-3">  
        <div className="flex justify-between items-start">  
          <span className="text-gray-500 dark:text-gray-400">Interface Type</span>  
          <span className="text-gray-900 dark:text-white font-medium text-right max-w-[60%] break-words">
            {network.interfaceType || 'N/A'}
          </span>  
        </div>
        {network.interface && (
          <div className="flex justify-between items-start">  
            <span className="text-gray-500 dark:text-gray-400">Interface</span>  
            <span className="text-gray-900 dark:text-white font-medium text-right max-w-[60%] break-words">
              {network.interface}
            </span>  
          </div>
        )}
        <div className="flex justify-between items-start">  
          <span className="text-gray-500 dark:text-gray-400">MAC Address</span>  
          <span className="text-gray-900 dark:text-white font-medium font-mono text-sm text-right max-w-[60%] break-all">
            {network.macAddress || 'N/A'}
          </span>  
        </div>  
        <div className="flex justify-between items-start">  
          <span className="text-gray-500 dark:text-gray-400">IP Address</span>  
          <span className="text-gray-900 dark:text-white font-medium font-mono text-sm text-right max-w-[60%] break-all">
            {network.ipAddresses || 'N/A'}
          </span>  
        </div>
        {network.publicIP && network.publicIP !== "N/A" && (
          <div className="flex justify-between items-start">  
            <span className="text-gray-500 dark:text-gray-400">Public IP</span>  
            <span className="text-gray-900 dark:text-white font-medium font-mono text-sm text-right max-w-[60%] break-all">
              {network.publicIP}
            </span>  
          </div>
        )}
        <div className="flex justify-between items-start">  
          <span className="text-gray-500 dark:text-gray-400">ISP</span>  
          <span className="text-gray-900 dark:text-white font-medium text-right max-w-[60%] break-words">
            {network.isp || 'N/A'}
          </span>  
        </div>  
        <div className="flex justify-between items-start">  
          <span className="text-gray-500 dark:text-gray-400">Latency (Cloudflare)</span>  
          <span className="text-gray-900 dark:text-white font-medium text-right max-w-[60%] break-words">
            {network.latency ? `${network.latency}ms` : 'N/A'}
          </span>  
        </div>
        {network.latencyGoogle > 0 && (
          <div className="flex justify-between items-start">  
            <span className="text-gray-500 dark:text-gray-400">Latency (Google)</span>  
            <span className="text-gray-900 dark:text-white font-medium text-right max-w-[60%] break-words">
              {network.latencyGoogle}ms
            </span>  
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkInfoCard;
