import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const StatsContext = createContext();
export const useStats = () => useContext(StatsContext);

export const StatsProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previousData, setPreviousData] = useState(null);

  // Helper function to calculate trend
  const calculateTrend = (current, previous) => {
    if (!previous) return '+';
    const change = current - previous;
    return change >= 0 ? '+' : '-';
  };

  // Helper function to calculate change percentage
  const calculateChange = (current, previous) => {
    if (!previous) return 0;
    return Math.abs(current - previous);
  };

  const fetchData = async () => {
    try {
      console.log('📡 Fetching system stats...');
      setError(null);
      
      const [deviceRes, usageRes, networkRes] = await Promise.all([
        axios.get('/api/device'),
        axios.get('/api/system'),
        axios.get('/api/network'),
      ]);

      // Parse the actual backend data structure
      const systemData = usageRes.data;
      
      // Extract current values from your backend format
      const cpuCurrent = systemData.cpu?.load_percent === "Unsupported" ? 0 : 
                        parseFloat(systemData.cpu?.load_percent) || 0;
      const ramCurrent = parseFloat(systemData.ram?.percent_used) || 0;
      const diskCurrent = parseFloat(systemData.disk?.percent_used) || 0;

      // Calculate trends if we have previous data
      const cpuTrend = calculateTrend(cpuCurrent, previousData?.usage?.cpu?.current);
      const ramTrend = calculateTrend(ramCurrent, previousData?.usage?.ram?.current);
      const diskTrend = calculateTrend(diskCurrent, previousData?.usage?.disk?.current);

      const cpuChange = calculateChange(cpuCurrent, previousData?.usage?.cpu?.current);
      const ramChange = calculateChange(ramCurrent, previousData?.usage?.ram?.current);
      const diskChange = calculateChange(diskCurrent, previousData?.usage?.disk?.current);

      // Transform data to match component expectations
      const transformedData = {
        device: {
          name: deviceRes.data.device_name || "Unknown Device",
          os: deviceRes.data.os || "Unknown OS",
          version: deviceRes.data.os_version || "N/A",
          cpu: deviceRes.data.cpu_model || "Unknown CPU",
          platform: deviceRes.data.platform || "Unknown",
          architecture: deviceRes.data.arch || "Unknown",
          uptime: deviceRes.data.uptime_seconds ? 
                  `${Math.floor(deviceRes.data.uptime_seconds / 3600)}h ${Math.floor((deviceRes.data.uptime_seconds % 3600) / 60)}m` : 
                  "N/A"
        },
        usage: {
          cpu: {
            current: cpuCurrent,
            trend: cpuTrend,
            change: cpuChange,
            history: previousData?.usage?.cpu?.history ? 
                    [...previousData.usage.cpu.history.slice(1), cpuCurrent] :
                    Array.from({ length: 24 }, () => Math.floor(Math.random() * 50) + 30),
            // Additional info from your backend
            status: systemData.cpu?.load_percent === "Unsupported" ? "Unsupported" : "Active"
          },
          ram: {
            current: ramCurrent,
            trend: ramTrend,
            change: ramChange,
            history: previousData?.usage?.ram?.history ? 
                    [...previousData.usage.ram.history.slice(1), ramCurrent] :
                    Array.from({ length: 24 }, () => Math.floor(Math.random() * 40) + 50),
            // Additional info from your backend
            totalGB: parseFloat(systemData.ram?.total_gb) || 0,
            usedGB: parseFloat(systemData.ram?.used_gb) || 0
          },
          disk: {
            current: diskCurrent,
            trend: diskTrend,
            change: diskChange,
            history: previousData?.usage?.disk?.history ? 
                    [...previousData.usage.disk.history.slice(1), diskCurrent] :
                    Array.from({ length: 24 }, () => Math.floor(Math.random() * 30) + 30),
            // Additional info from your backend
            totalGB: parseFloat(systemData.disk?.total_gb) || 0,
            usedGB: parseFloat(systemData.disk?.used_gb) || 0
          }
        },
        network: {
          interfaceType: networkRes.data.type || "Unknown",
          macAddress: networkRes.data.mac || "Unavailable",
          ipAddresses: networkRes.data.local_ip || "N/A",
          publicIP: networkRes.data.public_ip || "N/A",
          isp: "Unknown", // You might want to add this to your backend
          latency: networkRes.data.latency_cloudflare_ms || 0,
          // Additional network info
          interface: networkRes.data.interface || "Unknown",
          latencyGoogle: networkRes.data.latency_google_ms || 0,
          verdict: networkRes.data.verdict || {}
        }
      };

      // Store current data as previous for next iteration
      setPreviousData(data);
      setData(transformedData);
      setLoading(false);
      console.log('✅ System stats loaded successfully');
      
    } catch (error) {
      console.error('❌ Failed to fetch system stats:', error.message);
      setError(error.message);
      setLoading(false);
      
      // Optional: Set fallback mock data if backend is unavailable
      if (process.env.NODE_ENV === 'development') {
        setData(generateFallbackData());
      }
    }
  };

  // Fallback data for development
  const generateFallbackData = () => ({
    device: {
      name: "Development Machine",
      os: "Unknown",
      version: "N/A",
      cpu: "Backend Unavailable",
      platform: "Development",
      architecture: "N/A",
      uptime: "N/A"
    },
    usage: {
      cpu: {
        current: Math.floor(Math.random() * 40) + 30,
        trend: Math.random() > 0.5 ? '+' : '-',
        change: Math.floor(Math.random() * 5) + 1,
        history: Array.from({ length: 24 }, () => Math.floor(Math.random() * 50) + 30),
        status: "Mock"
      },
      ram: {
        current: Math.floor(Math.random() * 30) + 50,
        trend: Math.random() > 0.5 ? '+' : '-',
        change: Math.floor(Math.random() * 3) + 1,
        history: Array.from({ length: 24 }, () => Math.floor(Math.random() * 40) + 50),
        totalGB: 8,
        usedGB: 6
      },
      disk: {
        current: Math.floor(Math.random() * 20) + 35,
        trend: '+',
        change: 1,
        history: Array.from({ length: 24 }, () => Math.floor(Math.random() * 30) + 30),
        totalGB: 100,
        usedGB: 50
      }
    },
    network: {
      interfaceType: "Unavailable",
      macAddress: "00:00:00:00:00:00",
      ipAddresses: "Backend Unavailable",
      publicIP: "N/A",
      isp: "Unknown",
      latency: 0,
      interface: "mock",
      latencyGoogle: 0,
      verdict: {}
    }
  });

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Loading component
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600 dark:text-gray-300 text-lg font-medium">Loading system stats...</div>
          <div className="text-gray-500 dark:text-gray-400 text-sm mt-2">Connecting to backend...</div>
        </div>
      </div>
    );
  }

  // Error component  
  if (error && !data) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Connection Failed</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Unable to connect to the backend server.</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Error: {error}</p>
          <button 
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <StatsContext.Provider value={{ data, refreshData: fetchData, loading, error }}>
      {children}
    </StatsContext.Provider>
  );
};
