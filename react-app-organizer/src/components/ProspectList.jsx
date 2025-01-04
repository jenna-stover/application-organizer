import React, { useEffect, useState } from 'react';
import { getProspects, updateProspectStatus } from '../api';

const ProspectList = ({ onSelect, updateProspects }) => {
  const [prospects, setProspects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProspects();
      setProspects(data);
    };
    fetchData();
  }, [updateProspects]);

  const handleCheckboxChange = async (id, checked) => {
    await updateProspectStatus(id, checked);
    updateProspects(); 
  };

  return (
    <div id="prospect-list">
      {prospects.map(prospect => (
        <div key={prospect._id} className="prospect">
          <input
            type="checkbox"
            checked={prospect.completed}
            onChange={(e) => handleCheckboxChange(prospect._id, e.target.checked)}
          />
          <h3 onClick={() => onSelect(prospect)}>{prospect.name}</h3>
          <img src={prospect.img} alt={prospect.name} />
        </div>
      ))}
    </div>
  );
};

export default ProspectList;
