import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({session}) => { 
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem("authenticated") === "true";
    });

    useEffect(() => {
        // Verificar si el usuario está autenticado
        const session = sessionStorage.getItem("authenticated") === "true";
        setIsAuthenticated(session);
    }, []);

    // Redirigir al usuario si no está autenticado
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;