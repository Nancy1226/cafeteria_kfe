import { Pencil, Trash2 } from "lucide-react";

function TableUsers({ items = [], onEdit, onDelete }) {
  return (
    <div className="container__table__products">
      <table className="table__products">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {items.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td>{u.email}</td>
              <td>
                <button className="btn__edit" onClick={() => onEdit?.(u.id)}>
                  <Pencil size={14} />
                </button>
                <button className="btn__delete" onClick={() => onDelete?.(u.id)}>
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          ))}

          {items.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No hay usuarios para mostrar
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableUsers;
