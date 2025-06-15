// Frontend/src/components/auth/EntityRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const EntityRoute = () => {
    const userInfo = localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo')) 
        : null;

    // Si el usuario está logueado y es una Entidad (o SuperAdmin), permite el acceso.
    // Si no, lo redirige a la página de inicio.
    return userInfo && (userInfo.isEntity || userInfo.isSuperAdmin) ? <Outlet /> : <Navigate to="/" replace />;
};

export default EntityRoute;