import { Package } from "lucide-react";

function TableToolbar({ search, onSearchChange, onNew }) {
  return (
    <div className="table__search__products">
      <div className="filter__options">
        <div className="content__filter__btn">
          <button
            type="button"
            className="btn__filter active"
          >
            <Package size={16} />
            Productos
          </button>
        </div>
      </div>

      <div className="content__search">
        <div className="search__group">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="input__search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <button type="button" className="btn__new" onClick={onNew}>
          <span>+</span> Nuevo Producto
        </button>
      </div>
    </div>
  );
}

export default TableToolbar;
