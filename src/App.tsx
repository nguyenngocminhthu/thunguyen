import React from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import UserManagement from "./views/UserManagement";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <SideBar />
        <Routes>
          <Route path="/" element={<UserManagement />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
