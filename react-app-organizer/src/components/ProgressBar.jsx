import React, { useEffect, useState } from 'react';
import { getProspects } from '../api';

const ProgressBar = ({ prospects }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const updateProgressBar = async () => {
      const data = await getProspects();
      const total = data.length;
      const completed = data.filter(prospect => prospect.completed).length;
      const newPercentage = (completed / total) * 100;
      setPercentage(newPercentage);
    };
    updateProgressBar();
  }, [prospects]);

  return (
    <div id="progress-bar" style={{ width: `${percentage}%` }}>
      {percentage.toFixed(2)}% Completed
    </div>
  );
};

export default ProgressBar;
