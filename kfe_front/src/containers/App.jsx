import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { useState } from 'react';
// import Login from '../pages/Login';
import ShopCoffe from '../pages/ShopCoffe/ShopCoffe'
import Admin from '../pages/Admin/Admin';

const App = () => {
    // const [isLoged, setIsLoged] = useState(() => {
    //     return sessionStorage.getItem("authenticated") === "true";
    // });
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ShopCoffe />} />
                <Route path="/admin" element={<Admin />} />
                {/* Ruta protegida */}
                {/* <Route element={<ProtectedRoute/>}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/MT/:id" element={<AeMateria />} />
                    <Route path="/evaluacion/:id" element={<Cuestionario />} />
                </Route> */}
                {/* Redireccionar a la página de inicio si la ruta no coincide */}
                {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
        </Router>
    );
  };

export default App;