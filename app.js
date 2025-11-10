import React, { useState } from 'react';
import EcoPledge from './EcoPledge';

function App() {
  const [activities, setActivities] = useState([]);
  const [result, setResult] = useState(null);

  const addActivity = (type, value) => {
    setActivities([...activities, { type, ...value }]);
  };

  const calculateFootprint = async () => {
    const res = await fetch('http://localhost:3001/api/footprint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activities }),
    });
    const data = await res.json();
    setResult(data.total);
  };

  return (
    <div>
      <h1>Carbon Footprint Tracker</h1>
      <button onClick={() => addActivity('car', { distance: 10 })}>Add 10 km Car</button>
      <button onClick={() => addActivity('meat', { servings: 2 })}>Add 2 servings Meat</button>
      <button onClick={() => addActivity('electricity', { kWh: 15 })}>Add 15 kWh Electricity</button>
      <button onClick={calculateFootprint}>Calculate Footprint</button>
      {result !== null && <div>Your carbon footprint: {result.toFixed(2)} kg CO₂</div>}

      <EcoPledge />
    </div>
  );
}

export default App;