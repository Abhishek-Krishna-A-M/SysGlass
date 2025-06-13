const express = require('express');
const router = express.Router();
const si = require('systeminformation');
const ping = require('ping');

router.get('/', async (req, res) => {
  try {
    const cpu = await si.currentLoad();
    const mem = await si.mem();
    const disks = await si.fsSize();
    const disk = disks[0] || {};
    const pingGoogle = await ping.promise.probe('8.8.8.8');

    const cpuLoad = cpu.currentload || 0;
    const ramPercent = (mem.used / mem.total) * 100;
    const diskPercent = disk.use || 0;
    const latency = parseFloat(pingGoogle.time || 0);

    const verdict = {
      cpu: cpuLoad < 75 ? '✅ Good' : '⚠️ High Load',
      ram: ramPercent < 75 ? '✅ Good' : '⚠️ High Usage',
      disk: diskPercent < 85 ? '✅ Sufficient' : '⚠️ Low Space',
      ping: latency < 100 ? '✅ Fast' : '⚠️ Slow Network'
    };

    res.json({
      cpu_load_percent: cpuLoad.toFixed(1),
      ram_percent_used: ramPercent.toFixed(1),
      disk_percent_used: diskPercent.toFixed(1),
      ping_ms: latency.toFixed(1),
      verdict
    });
  } catch (err) {
    res.status(500).json({ error: 'Health check failed', details: err.toString() });
  }
});

module.exports = router;
