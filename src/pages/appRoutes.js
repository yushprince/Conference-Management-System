import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './home';
import Conferences from './conferences';
import Sidebar from "../components/Layout/sidebar";
import Header from "../components/Layout/header";
import Create from './create';
import Submit from './submit';
const AppRoutes = () => {
 

  return (

<div className="w-100">
<div className="d-flex flex-column ">
  <div
    className="d-flex w-100 p-2  mt-0 "
    style={{ minHeight: "60px", zIndex:3 }}
  >
    <Header  />
  </div>
  <div className="d-flex ">
    <div className="d-flex " style={{ minWidth: "14%", maxWidth: "25%"  }}>
      <Sidebar  />
    </div>
    <div className="d-flex " style={{ minWidth: "86%" }}>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/conferences" element={<Conferences/>} />
      <Route path="/create" element={<Create/>} />
      <Route path='/submit' element={<Submit/>} />
      <Route path='*' element={<Navigate to="/home" />} />
      <Route path="/conferences" element={<Conferences />} />
    </Routes>

    </div>
  </div>
</div>
</div>
  );
};

export default AppRoutes;
