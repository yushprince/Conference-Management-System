import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import AppRoutes from "./pages/appRoutes";
import LoginPage from "./pages/loginpage";
import ForgetPassword from "./pages/forgetpassword";
import Register from "./pages/registerUser";
import { apiURL } from "./env";
import axios from "axios";

function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [userDetails, setUserDetails] = useState(null); // State to store user details

  const getDetails = async (token) => {
    try {
      const { data } = await axios.get(`${apiURL}/api/user/getdetails`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      console.log(data);
      setUserDetails(data); // Update state with user details
    } catch {
      console.log("ERROR OCCURED WHILE FETCHING DATA");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getDetails(token);
      setLoggedin(true);
    }
  }, []);

  return (
    <Router>
      {loggedin ? 
        <AppRoutes userDetails={userDetails} /> :
        <Routes>
          <Route path="/login" element={<LoginPage setLoggedin={setLoggedin} />} />
          <Route path='*' element={<Navigate to="/login" />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      }
    </Router>
  );
}

export default App;
