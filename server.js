const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let pledges = [];
let footprints = [];

app.post('/api/footprint', (req, res) => {
  const { activities } = req.body;
  // Example calculation logic
  let total = 0;
  activities.forEach(act => {
    if (act.type === 'car') total += act.distance * 0.21;
    if (act.type === 'meat') total += act.servings * 5.0;
    if (act.type === 'electricity') total += act.kWh * 0.5;
  });
  footprints.push({ date: Date.now(), total });
  res.json({ total });
});

app.post('/api/pledge', (req, res) => {
  const pledge = req.body;
  pledges.push(pledge);
  res.json({ success: true, pledges });
});

app.get('/api/footprint', (req, res) => res.json(footprints));
app.get('/api/pledge', (req, res) => res.json(pledges));

app.listen(3001, () => console.log('Server running on http://localhost:3001'));