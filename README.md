# Candidate Recruiter Tool

## Overview

This project is a basic recruiter tool that allows recruiters to manage candidate information. The tool captures essential details for each candidate, such as name, contact information, skills/qualifications, current status, and an additional attribute for expected salary. Additionally, a computed score is implemented based on the candidate's experience with Node.js and ReactJS.

## Features

1. **Candidate Information:**
   - Candidate Name
   - Contact Information (Email, Phone)
   - Skills/Qualifications
   - Current Status (Contacted, Interview Scheduled, Offer Extended, Hired, Rejected)
   - Additional Attribute: Expected Salary (numeric value)

2. **Computed Score:**
   - The tool calculates a score for each candidate based on their experience with Node.js and ReactJS.
   - Node.js Experience (years):
     - Less than 1 year: Score 1
     - 1-2 years: Score 2
     - Over 2 years: Score 3
   - ReactJS Experience (years):
     - Less than 1 year: Score 1
     - 1-2 years: Score 2
     - Over 2 years: Score 3
   - Total Score: Sum of Node.js and ReactJS scores

## Getting Started

### Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager) installed on your machine

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/recruiter-tool.git

2. Navigate to the project directory:

   ```bash
   cd recruiter-tool

3. Install dependencies:

   ```bash
   npm install

### Usage
To start the development server and run the application:

   ```bash
   npm start

Open your browser and go to http://localhost:3000 to view the application. The page will automatically reload when you make changes.

### Server Setup
For the server to run, use the following command:

   ```bash
   pscale connect recruitment main --execute 'node server.js'

Ensure that the server is configured correctly and the necessary dependencies are installed.

### License
This project is licensed under the MIT License.
