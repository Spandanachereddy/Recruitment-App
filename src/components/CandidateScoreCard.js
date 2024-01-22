import React from 'react';

const CandidateScoreCard = ({ candidate }) => {
  const { nodeJsExperience, reactJsExperience } = candidate;

  // Function to calculate the total score based on Node.js and ReactJS experience
  const calculateTotalScore = () => {
    const nodejsExperienceScore = calculateExperienceScore(nodeJsExperience);
    const reactjsExperienceScore = calculateExperienceScore(reactJsExperience);
    return nodejsExperienceScore + reactjsExperienceScore;
  };

  // Function to calculate the experience score based on years of experience
  const calculateExperienceScore = (experience) => {
    if (experience < 1) return 1;
    else if (experience >= 1 && experience <= 2) return 2;
    else return 3;
  };

  return (
    <div className="max-w-md mx-auto p-6 my-10 bg-white border rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Candidate Score Card</h2>

      <p>
        <strong>Node.js Experience:</strong> {nodeJsExperience} years
      </p>
      <p>
        <strong>ReactJS Experience:</strong> {reactJsExperience} years
      </p>

      <p>
        <strong>Total Score:</strong> {calculateTotalScore()}
      </p>
    </div>
  );
};

export default CandidateScoreCard;
