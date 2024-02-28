import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import BasePage from './components/BasePage.jsx';
import MainRoutes from './pages/MainRoutes';
import UserProfile from "./pages/UserProfile";

export default () => (
  <BrowserRouter>
    <BasePage>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<MainRoutes />} />
      </Routes>
    </BasePage>
  </BrowserRouter>
);
