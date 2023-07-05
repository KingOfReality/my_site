import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './cardOfObject';

const AttackList = () => {
  const [attacks, setAttacks] = useState([]);
  const [selectedAttack, setSelectedAttack] = useState(null);

  useEffect(() => {
    fetchAttacks();
  }, []);

  const fetchAttacks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/attacks');
      const data = await response.json();
      setAttacks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttackItemClick = (attack) => {
    setSelectedAttack(attack);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h1 className="mt-4">Attack List</h1>
          <div className="list-group mt-4">
            {attacks.length > 0 ? (
              attacks.map((attack) => (
                <Link
                  key={attack.id}
                  className={`list-group-item list-group-item-action ${selectedAttack === attack ? 'active' : ''}`}
                  onClick={() => handleAttackItemClick(attack)}
                >
                  {attack.name}
                </Link>
              ))
            ) : (
              <p>Loading attacks...</p>
            )}
          </div>
        </div>
        <div className="col-md-8">
          {selectedAttack && (
            <Card
              title={selectedAttack.name}
              platforms={selectedAttack.x_mitre_platforms || []}
              phases={selectedAttack.kill_chain_phases || []}
              attack_id={selectedAttack.id
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AttackList;
