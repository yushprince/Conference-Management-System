import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../resources/sidebar.css";

const Sidebar = () => {
  const [activePage, setActivePage] = useState("/dashboard");
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (path.startsWith("/dashboard")) {
      setActivePage("/dashboard");
    } else if (path.startsWith("/Conferences")) {
      setActivePage("/Conferences");
    } else if (path.startsWith("/createConference")) {
      setActivePage("/createConference");
    }
  }, [path]);

  const showPage = (value) => {
    setActivePage(value);
    navigate(value);
  };

  const userDetails = useSelector((state) => state.user.userData);

  return (
    <div className="w-100 p-3">
      <div
        className={`sidebar-item ${activePage === "/dashboard" ? "active" : ""}`}
        onClick={() => showPage("/dashboard")}
      >
        Dashboard
      </div>
      <div
        className={`sidebar-item ${activePage === "/Conferences" ? "active" : ""}`}
        onClick={() => showPage("/conferences")}
      >
        Conferences
      </div>
      {userDetails.type === "ADMIN" && (
        <div
          className={`sidebar-item ${activePage === "/createConference" ? "active" : ""}`}
          onClick={() => showPage("/create")}
        >
          Create
        </div>
      )}
    </div>
  );
};

export default Sidebar;

