import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Submit = ({ conference }) => {
 const location = useLocation()
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [paperFile, setPaperFile] = useState(null);
  conference = location.state.conferenceId

  console.log("CONFERENCE0")
   console.log(conference)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log('Form submitted:', { name, phone, email, paperFile, conference });
    // Reset form fields after submission
    setName('');
    setPhone('');
    setEmail('');
    setPaperFile(null);
  };

  return (
    <div>
      <h2>Submit Paper for {conference.name}</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Phone:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Paper File:</label>
        <input
          type="file"
          onChange={(e) => setPaperFile(e.target.files[0])}
          required
        />
        {/* Hidden input for conference */}
        <input type="hidden" name="conference" value={conference.id} />

        <button type="submit">Submit Paper</button>
      </form>
    </div>
  );
};

export default Submit;
