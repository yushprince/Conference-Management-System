import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { apiURL } from "../env"; // Import your API URL

const Create = () => {
  const [conferenceName, setConferenceName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const bodyData = {
        name: conferenceName,
        start: startTime,
        end: endTime
      };

      await axios.post(`${apiURL}/api/admin/createConference`, bodyData);
      // Clear form after submission
      setConferenceName('');
      setStartTime('');
      setEndTime('');
      alert("Conference Created")
    } catch (error) {
      console.error("Error creating conference", error);
    }
  };

  return (
    <div>
      <h2>Create Conference</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="conferenceName">Conference Name:</label>
          <input
            type="text"
            id="conferenceName"
            value={conferenceName}
            onChange={(e) => setConferenceName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time:</label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Conference</button>
      </form>
    </div>
  );
};

export default Create;
