import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiURL } from '../env'; // Make sure to import your API URL
import Modal from 'react-modal'; // Import Modal from a library like react-modal
import '../resources/table.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [conferences, setConferences] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal visibility
  const [selectedConference, setSelectedConference] = useState(null); // State to store selected conference
 const navigate = useNavigate()
  const getDetails = async () => {
    try {
      const { data } = await axios.get(`${apiURL}/api/user/getconferences`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setConferences(data.data);
    } catch (error) {
      console.error("Error fetching conferences", error);
    }
  };

  const navigateToSubmit = (conferenceId) => {
   navigate('/submit', { state: {conferenceId} });
 };

  useEffect(() => {
    getDetails();
  }, []);

  const openModal = (conference) => {
    setSelectedConference(conference);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedConference(null);
  };

  return (
    <>
      <div>
        <h2>Conferences</h2>
        <table>
          <thead>
            <tr>
              <th>Conference Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {conferences.map((conference) => (
              <tr key={conference.id}>
                <td>{conference.name}</td>
                <td>{new Date(conference.start).toLocaleString()}</td>
                <td>{new Date(conference.end).toLocaleString()}</td>
                <td>
                <button onClick={() => navigateToSubmit(conference)}>Submit Paper</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

       
      </div>
    </>
  );
};

export default Home;
