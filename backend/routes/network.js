const express = require('express');
const router = express.Router();
const si = require('systeminformation');
const publicIp = require('public-ip');
const ping = require('ping');

router.get('/', async (req, res) => {
  try {
    const interfaces = await si.networkInterfaces();
    const active = interfaces.find(i => i.ip4 && !i.internal) || {};

    const local_ip = active.ip4 || 'Unavailable';
    const mac = active.mac === '00:00:00:00:00:00' ? 'Unavailable' : active.mac;
    const type = active.iface && active.iface.startsWith('rmnet') ? 'Mobile Data' : active.type || 'unknown';

    const publicIp = require('public-ip');
const public_ip = await publicIp.v4({ timeout: 1000 }).catch(() => 'Unavailable');

    const pingGoogle = await ping.promise.probe('google.com', { timeout: 1 });
    const pingCloudflare = await ping.promise.probe('1.1.1.1', { timeout: 1 });

    const latency_google = pingGoogle.time && pingGoogle.time !== 'unknown' ? Number(pingGoogle.time).toFixed(1) : 'unknown';
    const latency_cloudflare = pingCloudflare.time && pingCloudflare.time !== 'unknown' ? Number(pingCloudflare.time).toFixed(1) : 'unknown';

    // Verdict logic
    const latencyVal = parseFloat(latency_google);
    let latencyVerdict = '❌ Unreachable';
    if (!isNaN(latencyVal)) {
      latencyVerdict =
        latencyVal < 30
          ? '✅ Fast'
          : latencyVal < 80
          ? '⚠️ Moderate'
          : '❗ Slow';
    }

    res.json({
      interface: active.iface || 'Unavailable',
      local_ip,
      mac,
      type,
      public_ip,
      latency_google_ms: latency_google,
      latency_cloudflare_ms: latency_cloudflare,
      verdict: {
        connection: local_ip !== 'Unavailable' ? '✅ Active' : '❌ Inactive',
        latency: latencyVerdict,
      }
    });

  } catch (err) {
    res.status(500).json({ error: 'Failed to get network info', details: err.toString() });
  }
});

module.exports = router;
