import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ShopCoffe from '../pages/ShopCoffe/ShopCoffe'
import Inventario from '../pages/Inventario/Inventario';
import VentasReporte from '../pages/VentasReporte';
import Login from '../pages/Login';
import Register from '../pages/Register';
import RoleRoute from '../containers/RoleRoute';
import NoAutorizado from '../pages/NoAutorizado';
import NoEncontrado from '../pages/NoEncontrado';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/registro" element={<Register/>} />
                <Route element={<RoleRoute/>}>
                    <Route path="/ventas" element={<ShopCoffe />} />
                    <Route path="/inventario" element={<Inventario />} />
                </Route>
                 <Route element={<RoleRoute allowedRoles={["admin"]} />}>
                <Route path="/reportes" element={<VentasReporte />} />
                </Route> 
                <Route path="*" element={<NoEncontrado/>} />
                <Route path="/no-autorizado" element={<NoAutorizado />} />
            </Routes>
        </Router>
    );
  };

export default App;