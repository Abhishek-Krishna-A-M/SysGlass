const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/device', require('./routes/device'));
app.use('/api/network', require('./routes/network'));
app.use('/api/system', require('./routes/system'));
app.use('/api/diagnose', require('./routes/diagnose'));

app.listen(PORT, () => {
  console.log(`Sysglass backend running at http://localhost:${PORT}`);
});
