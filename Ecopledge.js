import React, { useState } from 'react';

function EcoPledge() {
  const [pledge, setPledge] = useState('');
  const [pledges, setPledges] = useState([]);

  const submitPledge = async () => {
    const res = await fetch('http://localhost:3001/api/pledge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pledge }),
    });
    const data = await res.json();
    setPledges(data.pledges);
    setPledge('');
  };

  return (
    <div>
      <h2>Make an Eco Pledge</h2>
      <input
        value={pledge}
        onChange={e => setPledge(e.target.value)}
        placeholder="e.g., walk to work 2x/week"
      />
      <button onClick={submitPledge}>Commit</button>
      <ul>
        {pledges.map((p, i) => <li key={i}>{p.pledge}</li>)}
      </ul>
    </div>
  );
}

export default EcoPledge;