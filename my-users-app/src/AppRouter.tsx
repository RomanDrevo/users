// src/AppRouter.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Users from './components/Users';

const AppRouter: React.FC = () => {
    const isLoggedIn = () => {
        // TODO: Implement authentication logic and store login status
        return false;
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/users"
                    element={isLoggedIn() ? <Users /> : <Navigate replace to="/login" />}
                />
                <Route
                    path="*"
                    element={<Navigate replace to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;
