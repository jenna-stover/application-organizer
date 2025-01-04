import React from 'react';
import { deleteProspect, getProspects } from '../api';

const ProspectDetails = ({ prospect, onDelete, updateProspects }) => {
  if (!prospect) return <p>Select a prospect to see details</p>;

  const handleDelete = async () => {
    await deleteProspect(prospect._id);
    const updatedProspects = await getProspects();
    updateProspects(updatedProspects);
    onDelete(null);
  };

  return (
    <div id="prospect-details">
      <h3>{prospect.company}</h3>
      <a href={prospect.link} target="_blank" rel="noopener noreferrer">Application Link</a>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ProspectDetails;
