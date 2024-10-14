// agent.js
const axios = require('axios');
const os = require('os');

const collectMetrics = async () => {
  const cpuUsage = os.loadavg()[0]; // 1-minute load average
  const freeMemory = os.freemem();
  const totalMemory = os.totalmem();
  const memoryUsage = ((totalMemory - freeMemory) / totalMemory) * 100;

  const metrics = [
    {
      timestamp: new Date().toISOString(),
      type: 'cpu_usage',
      value: cpuUsage,
    },
    {
      timestamp: new Date().toISOString(),
      type: 'memory_usage',
      value: memoryUsage,
    },
  ];

  try {
    await axios.post('http://localhost:3000/metrics', {
      application: 'my_app',
      metrics: metrics,
    });
    console.log('Metrics sent successfully');
  } catch (error) {
    console.error('Error sending metrics', error);
  }
};

setInterval(collectMetrics, 15000); // Collect metrics every 15 seconds

