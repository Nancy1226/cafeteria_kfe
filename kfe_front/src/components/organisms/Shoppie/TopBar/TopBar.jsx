import "./TopBar.css";
import { Clock, DollarSign, SquareChartGantt, LogOut, ChartNoAxesCombined } from "lucide-react";
import {  getRole } from "../../../../auth/auth.js";

function TopBar({
  nameCoffeShop = "Cafeteria KFE",
  goToVentas,
  goToInventario,
  onLogout,
  goToGrapics,
}) {
  const now = new Date();

  const dateText = now.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const timeText = now.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });


  const role = getRole();
  const canSeeReports = role === "admin";

  return (
    <header className="topbar">
      <div className="topbar__left">
        <div className="brand">
          <h1 className="topbar__title">{nameCoffeShop}</h1>
          <p className="topbar__subtitle">{dateText}</p>
        </div>
      </div>

      <div className="topbar__right">
        <div className="topbar__time">
          <Clock size={14} />
          <span>{timeText}</span>
        </div>

        <button className="topbar__btn" onClick={goToVentas}>
          <DollarSign size={14} />
          <span>Ventas</span>
        </button>

        <button className="topbar__btn" onClick={goToInventario}>
          <SquareChartGantt size={14} />
          <span>Inventario</span>
        </button>

        {canSeeReports && (
        <button className="topbar__btn" onClick={goToGrapics}>
          <ChartNoAxesCombined size={14} />
          <span>Graficas</span>
        </button>
        )}

        <button className="topbar__btn danger" onClick={onLogout}>
          <LogOut size={14} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
}

export default TopBar;
