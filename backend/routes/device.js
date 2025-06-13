const express = require('express');
const router = express.Router();
const os = require('os');
const si = require('systeminformation');

router.get('/', async (req, res) => {
  try {
    const cpu = await si.cpu();
    const system = await si.system();
    const osInfo = await si.osInfo();
    const uptime = os.uptime();

    res.json({
      device_name: os.hostname(),
      os: osInfo.distro,
      os_version: osInfo.release,
      platform: os.platform(),
      arch: os.arch(),
      cpu_model: cpu.manufacturer + ' ' + cpu.brand,
      cpu_cores: cpu.cores,
      vendor: system.manufacturer,
      model: system.model,
      uptime_seconds: uptime
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get device info', details: err.toString() });
  }
});

module.exports = router;
