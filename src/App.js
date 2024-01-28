// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import CandidateForm from './components/CandidateForm';
import CandidateScoreCard from './components/CandidateScoreCard';
import axios from 'axios';
import CandidateList from './components/CandidateList';

function App() {
  const [candidate, setCandidate] = useState({
    nodeJsExperience: 0,
    reactJsExperience: 0,
  });
  const [successMessage, setSuccessMessage] = useState('');

  const addCandidate = async (newCandidate) => {
    try {
      const response = await axios.post('https://vermillion-gecko-2c34f2.netlify.app/candidates', newCandidate);

      setCandidate({
        nodeJsExperience: response.data.nodeJsExperience,
        reactJsExperience: response.data.reactJsExperience,
      });

      setSuccessMessage('Candidate added successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);

      console.log('Candidate added successfully:', response.data);
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  const handleSelectCandidate = (selectedCandidate) => {
    // Handle the selected candidate (e.g., display details, allow for deletion)
    console.log('Selected Candidate:', selectedCandidate);
  };

  return (
    <Router>
      <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">Recruitment App</h1>
          <nav className="flex space-x-4">
            <Link to="/" className="text-blue-500 hover:underline">Home</Link>
            <Link to="/candidates" className="text-blue-500 hover:underline">Candidate List</Link>
          </nav>
        </div>
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="flex">
                  <div className="w-1/2 pr-4">
                    <div className="bg-white p-4 rounded shadow-md mb-8">
                      <CandidateForm addCandidate={addCandidate} />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="bg-white p-4 rounded shadow-md">
                      <CandidateScoreCard candidate={candidate} />
                    </div>
                  </div>
                </div>
              </>
            }
          />
          <Route path="/candidates" element={<CandidateList onSelectCandidate={handleSelectCandidate} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
