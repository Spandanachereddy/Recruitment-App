import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidateList = ({ onSelectCandidate }) => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    // Fetch candidates on component mount
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('http://localhost:3001/candidates');
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const handleSelectCandidate = (candidate) => {
    onSelectCandidate(candidate);
    setSelectedCandidate(candidate);
  };

  const sortCandidatesByExperience = () => {
    const sortedCandidates = [...candidates].sort((a, b) => b.nodeJsExperience - a.nodeJsExperience);
    setCandidates(sortedCandidates);
  };

  const sortCandidatesByScore = () => {
    const sortedCandidates = [...candidates].sort((a, b) => b.totalScore - a.totalScore);
    setCandidates(sortedCandidates);
  };

  const handleDeleteCandidate = async (candidateId) => {
    try {
      await axios.delete(`http://localhost:3001/candidates/${candidateId}`);
      // Fetch candidates again after deletion
      fetchCandidates();
      // Clear the selected candidate details
      setSelectedCandidate(null);
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md flex">
      <div className="w-2/3 pr-8">
        <h2 className="text-xl font-bold mb-4">Candidate List</h2>
        <div className="mb-4">
          <button
            onClick={sortCandidatesByExperience}
            className="bg-gray-300 px-4 py-2 rounded-md mr-4 hover:bg-gray-400 transition duration-300"
          >
            Sort by Experience
          </button>
          <button
            onClick={sortCandidatesByScore}
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Sort by Score
          </button>
        </div>
        <ul className="list-none">
          {candidates.map((candidate) => (
            <li key={candidate.id} className="bg-white p-4 rounded-md shadow mb-4 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{candidate.name}</p>
                <p className="text-gray-600">{candidate.email}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleSelectCandidate(candidate)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 mr-2"
                >
                  Select
                </button>
                <button
                  onClick={() => handleDeleteCandidate(candidate.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedCandidate && (
        <div className="w-1/3">
          <div className="bg-white p-4 rounded-md shadow mb-4">
            <h3 className="text-lg font-bold mb-4">Selected Candidate Details:</h3>
            <p>Name: {selectedCandidate.name}</p>
            <p>Email: {selectedCandidate.email}</p>
            <p>Phone: {selectedCandidate.phone}</p>
            <p>Skills: {selectedCandidate.skills}</p>
            <p>Status: {selectedCandidate.status}</p>
            <p>Expected Salary: {selectedCandidate.expectedSalary}</p>
            <p>Node.js Experience: {selectedCandidate.nodeJsExperience}</p>
            <p>React.js Experience: {selectedCandidate.reactJsExperience}</p>
            <p>Total Score: {selectedCandidate.totalScore}</p>
          
            {/* Add other details as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateList;
