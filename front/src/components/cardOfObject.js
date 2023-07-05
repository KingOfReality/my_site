import React from 'react';

function Card({ title, text, attack_id, weaknesses, platforms, phases }) {
  return (
    <div className="card" style={{ width: '300px', marginTop: '20px', marginLeft: '20px' }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Id: {attack_id}</li>
        <li className="list-group-item">Platforms: {platforms.join(', ')}</li>
        <li className="list-group-item">Phases:</li>
        <ul>
          {phases.map((phase, index) => (
            <li key={index}>{phase.phase_name}</li>
          ))}
        </ul>
      </ul>
      <div className="card-body">
       
      </div>
    </div>
  );
}

export default Card;
