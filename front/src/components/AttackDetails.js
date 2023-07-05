import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';

function AttackDetails() {
  const { id } = useParams();
  const [attack, setAttack] = useState(null);

  useEffect(() => {
    fetchAttackDetails(id);
  }, [id]);

  const fetchAttackDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/attacks/${id}`);
      const attackData = response.data;
      setAttack(attackData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {attack && (
        <Card
          title={attack.title}
          text={attack.text}
          attack_id={attack.attack_id}
          weak_platform={attack.weak_platform}
          detect={attack.detect}
          phase={attack.phase}
        />
      )}
    </div>
  );
}

export default AttackDetails;
