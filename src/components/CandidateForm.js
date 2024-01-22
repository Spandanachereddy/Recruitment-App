import React, { useState } from 'react';

const CandidateForm = ({ addCandidate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState('');
  const [status, setStatus] = useState('Contacted');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [nodeJsExperience, setNodejsExperience] = useState(0);
  const [reactJsExperience, setReactjsExperience] = useState(0);
  const [error, setError] = useState('');

  const validateFormData = () => {
    // Validate each field based on the specified schema
    if (!name || !email || !phone || !skills || !expectedSalary) {
      setError('Please fill in all required fields.');
      return false;
    }

    // If all validations pass, return true
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    const isFormDataValid = validateFormData();

    if (!isFormDataValid) {
      // If validation fails, do not proceed with submission
      return;
    }

    const newCandidate = {
      name,
      email,
      phone,
      skills,
      status,
      expectedSalary,
      nodeJsExperience, // Make sure these values are captured from your form
      reactJsExperience, // Make sure these values are captured from your form
    };

    addCandidate(newCandidate);

    // Reset form fields and error state
    setName('');
    setEmail('');
    setPhone('');
    setSkills('');
    setStatus('Contacted');
    setExpectedSalary('');
    setNodejsExperience(0);
    setReactjsExperience(0);
    setError('');
  };

  return (
    <form className="max-w-md mx-auto p-6 my-10 bg-white border rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Candidate</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-4">
        <label htmlFor="name" className="text-sm text-gray-600">
          Full Name:
        </label>
        <input
          type="text"
          id="name"
          className="w-full p-2 border-b focus:outline-none focus:border-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="text-sm text-gray-600">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-2 border-b focus:outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="text-sm text-gray-600">
          Phone:
        </label>
        <input
          type="tel"
          id="phone"
          className="w-full p-2 border-b focus:outline-none focus:border-blue-500"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="skills" className="text-sm text-gray-600">
          Skills/Qualifications:
        </label>
        <input
          type="text"
          id="skills"
          className="w-full p-2 border-b focus:outline-none focus:border-blue-500"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="expectedSalary" className="text-sm text-gray-600">
          Expected Salary:
        </label>
        <input
          type="number"
          id="expectedSalary"
          className="w-full p-2 border-b focus:outline-none focus:border-blue-500"
          value={expectedSalary}
          onChange={(e) => setExpectedSalary(e.target.value)}
          min="0" // Set the minimum expected salary
          max="1000000" // Set the maximum expected salary
        />
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="text-sm text-gray-600">
          Status:
        </label>
        <select
          id="status"
          className="w-full p-2 border-b focus:outline-none focus:border-blue-500"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Contacted">Contacted</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Offer Extended">Offer Extended</option>
          <option value="Hired">Hired</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="nodeJsExperience" className="text-sm text-gray-600">
          Node.js Experience:
        </label>
        <input
          type="number"
          id="nodeJsExperience"
          className="w-full p-2 border-b focus:outline-none focus:border-blue-500"
          value={nodeJsExperience}
          onChange={(e) => setNodejsExperience(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="reactJsExperience" className="text-sm text-gray-600">
          React.js Experience:
        </label>
        <input
          type="number"
          id="reactJsExperience"
          className="w-full p-2 border-b focus:outline-none focus:border-blue-500"
          value={reactJsExperience}
          onChange={(e) => setReactjsExperience(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Add Candidate
      </button>
    </form>
  );
};

export default CandidateForm;
