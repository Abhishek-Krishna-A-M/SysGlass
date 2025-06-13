import React from 'react';
import { useStats } from '../backend-connector';

const DeviceOverviewCard = () => {
  const { data } = useStats();
  const device = data?.device || {};

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Device Overview</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Device Name</span>
          <span className="text-gray-900 dark:text-white font-medium text-right max-w-[60%] truncate">
            {device.name || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">OS</span>
          <span className="text-gray-900 dark:text-white font-medium text-right max-w-[60%] truncate">
            {device.os || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Version</span>
          <span className="text-gray-900 dark:text-white font-medium text-right max-w-[60%] truncate">
            {device.version || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">CPU Model</span>
          <span className="text-gray-900 dark:text-white font-medium text-right max-w-[60%] truncate" title={device.cpu}>
            {device.cpu || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Platform</span>
          <span className="text-gray-900 dark:text-white font-medium text-right max-w-[60%] truncate">
            {device.platform || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Architecture</span>
          <span className="text-gray-900 dark:text-white font-medium text-right max-w-[60%] truncate">
            {device.architecture || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Uptime</span>
          <span className="text-gray-900 dark:text-white font-medium text-right max-w-[60%] truncate">
            {device.uptime || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeviceOverviewCard;
