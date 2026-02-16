import "./TopBar.css";
import { Clock, User } from "lucide-react";

function TopBar({nameCoffeShop={nameCoffeShop}, roleUser={roleUser}}) {
  const now = new Date();
  const dateText = now.toLocaleDateString("es-MX", { weekday: "long", day: "2-digit", month: "long", year: "numeric", });
  const timeText = now.toLocaleTimeString("es-MX", {hour: "2-digit", minute:"2-digit", });

  return (
    <header className="topbar">
      {/* lado izquierdo */}
      <div className="topbar__left">
        <div className="brand">
          <h1 className="topbar__title">{nameCoffeShop}</h1>
          <p className="topbar__subtitle">{dateText}</p>
        </div>
      </div>

      {/* lado derecho */}
      <div className="topbar__right">
        <div className="topbar__time">
          <span className="topbar__icon" aria-hidden="true"><Clock zize={14}/></span>
          <span>{timeText}</span>
        </div>

        <div className="topbar__user">
          <span className="topbar__icon" aria-hidden="true"><User size={14}/></span>
          <span>{roleUser}</span>
        </div>
      </div>
    </header>
  )
}

export default TopBar;