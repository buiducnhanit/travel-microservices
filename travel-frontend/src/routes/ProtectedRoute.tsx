import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

interface ProtectedRouteProps {
    roleRequired: "User" | "Admin";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roleRequired }) => {
    const auth = useSelector((state: RootState) => state.auth)

    if (!auth.isAuthenticated) return <Navigate to="/login" />;
    if (auth.user.user.role.name !== roleRequired) return <Navigate to="/403" />;

    return <Outlet />;
}

export default ProtectedRoute