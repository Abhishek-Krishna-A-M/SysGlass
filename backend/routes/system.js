const express = require('express');
const router = express.Router();
const si = require('systeminformation');

router.get('/', async (req, res) => {
  try {
    const cpu = await si.currentLoad();
    const mem = await si.mem();
    const disks = await si.fsSize();

    const disk = disks.length > 0 ? disks[0] : null;

    res.json({
      cpu: {
  load_percent: typeof cpu.currentload === 'number'
    ? cpu.currentload.toFixed(1)
    : 'Unsupported'
},
      ram: {
        total_gb: (mem.total / 1e9).toFixed(2),
        used_gb: (mem.used / 1e9).toFixed(2),
        percent_used: ((mem.used / mem.total) * 100).toFixed(1),
      },
      disk: disk
        ? {
            total_gb: (disk.size / 1e9).toFixed(2),
            used_gb: (disk.used / 1e9).toFixed(2),
            percent_used: disk.use?.toFixed(1) || 'N/A',
          }
        : {
            total_gb: 'N/A',
            used_gb: 'N/A',
            percent_used: 'N/A',
          }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get system info', details: err.toString() });
  }
});
module.exports = router;
