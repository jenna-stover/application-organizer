import React, { useState, useEffect } from 'react';
import { getProspects } from './api';
import './styles/Home.css';

const Home = () => {
  const [prospects, setProspects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const data = await getProspects();
        setProspects(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProspects();
  }, []);

  if(error) {
    console.log("Error fetching prospects:", error);
    return <div>Error: {error}</div>;
  }


  return (
    <div className="content-container">
      <header className="main-header">
        <h1>Application Organizer</h1>
      </header>
      <main className="main-content">
        <h2>List of Job Prospects</h2>
        {prospects.length > 0 ? (
          <ul>
            {prospects.map((prospect) => (
              <li key={prospect._id}>{prospect.name}</li>
            ))}
          </ul>
        ) : (
          <p>No prospects found.</p>
        )}
      </main>
    </div>
  );
}

export default Home;
