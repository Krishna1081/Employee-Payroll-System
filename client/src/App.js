import React from "react";
import {  Route, Routes, Navigate  } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle";
import Login from './app/login/login';
import './App.css';
// import Home from "./app/home/home";
import Start from "./app/start_page/start";
import HomePage from "./app/home/home_page";


const App = () => {
  return (
    <>
    {/* <AppBar/> */}
      <Routes>
        {/* <Route path="/" Component={Home}/> */}
        <Route path="*" element={<Navigate replace to={"/"} />} />       
        <Route path="/login" Component={Login} />
        <Route path="/startpage" Component={Start} />        
        <Route path="/homepage" Component={HomePage} />

      </Routes>
    </>
  );
};

export default App;