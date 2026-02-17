import { Package, UsersRound } from "lucide-react";

function TableToolbar({ active, onChangeActive, search, onSearchChange, onNew }) {
  return (
    <div className="table__search__products">
      <div className="filter__options">
        <div className="content__filter__btn">
          <button
            type="button"
            className={`btn__filter ${active === "productos" ? "active" : ""}`}
            onClick={() => active !== "productos" && onChangeActive("productos")}
          >
            <Package size={16} />
            Productos
          </button>

          <button
            type="button"
            className={`btn__filter ${active === "usuarios" ? "active" : ""}`}
            onClick={() => active !== "usuarios" && onChangeActive("usuarios")}
          >
            <UsersRound size={16} />
            Usuarios
          </button>
        </div>
      </div>

      <div className="content__search">
        <div className="search__group">
          <input
            type="text"
            placeholder={active === "productos" ? "Buscar producto..." : "Buscar usuario..."}
            className="input__search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <button type="button" className="btn__new" onClick={onNew}>
          <span>+</span> {active === "productos" ? "Nuevo Producto" : "Nuevo Usuario"}
        </button>
      </div>
    </div>
  );
}

export default TableToolbar;
