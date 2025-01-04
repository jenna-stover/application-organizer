import React, { useState, useEffect } from 'react';
import './styles/Home.css';
import AddForm from './components/AddForm';
import EditForm from './components/EditForm';
import ProspectList from './components/ProspectList';
import ProspectDetails from './components/ProspectDetails';
import ProgressBar from './components/ProgressBar';
import { getProspects } from './api';

function App() {
  const [prospects, setProspects] = useState([]);
  const [selectedProspect, setSelectedProspect] = useState(null);

  const updateProspects = async () => {
    const data = await getProspects();
    setProspects(data);
  };

  useEffect(() => {
    updateProspects();
  }, []);

  const handleAddProspect = (newProspect) => {
    setProspects((prevProspects) => [...prevProspects, newProspect]);
  };

  const handleEditProspect = (updatedProspect) => {
    setProspects((prevProspects) =>
      prevProspects.map((prospect) =>
        prospect._id === updatedProspect._id ? updatedProspect : prospect
      )
    );
  };

  return (
    <div classNameName="main-container">
      <header className="main-header">
            <h1><a href="#">Application Organizer</a></h1>
        </header>
        <main classNameName= "main-content">
            <div className="progress-container">
              <ProgressBar prospects={prospects} />
            </div>

            <div className="main-container">
                <div className="prospect-list-container split">
                    <div id="center-prospect-list">
                        <h2>List of Job Prospects</h2>
                        <div id="add-button">
                            <a href="#">Add Prospect (+)</a>
                        </div>
                        <ProspectList onSelect={setSelectedProspect} updateProspects={updateProspects} />
                        <div id="add-prospect-container" className="dialog transparent">
                            <AddForm onAddProspect={handleAddProspect}/>
                        </div> 
                    </div>
                </div>

                <div id="prospect-details-container split" className="hidden">
                    <div id="center-prospect-details">
                        <div>
                            <h2>Position Details</h2> 
                        </div>
                        
                        <div id="prospect-details">
                            <ProspectDetails 
                                prospect={selectedProspect}
                                onDelete={setSelectedProspect}
                                updateProspects={updateProspects}
                            />
                        </div>
                        <div id="edit-prospect-container" className="dialog transparent">
                            <EditForm onEditProspect={handleEditProspect}/>
                        </div> 
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}

export default App;
