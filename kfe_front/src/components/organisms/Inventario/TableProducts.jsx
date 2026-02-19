import { Pencil, Trash2 } from "lucide-react";
import Image from "../../atoms/Image";
import Title from "../../atoms/Title";
import P from "../../atoms/P";

function TableProducts({ items = [], onEdit, onDelete }) {
  return (
    <div className="container__table__products">
      <table className="table__products">
        <thead>
          <tr>
            <th>Img</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {items.map((p) => {
            const qty = Number(p.quantity ?? 0); 

            return (
              <tr key={p.id}>
                <td>
                  <div className="content__image__table">
                    <Image src={p.src} classNameImg="image__product__table" />
                  </div>
                </td>

                <td>
                  <Title classNameTitle="product__title" titleCard={p.titleCard} />
                  <P
                    classNameDescription="product__description"
                    descriptionCard={p.descriptionCard}
                  />
                </td>

                <td className="table__food">
                  <span>{p.nameTD}</span>
                </td>

                <td className="table__price">{p.namePriceTable}</td>

                <td className="table__quantity">
                  <span
                    className={`badge__stock ${
                      qty === 0 ? "stock__empty" : qty <= 5 ? "stock__low" : "stock__ok"
                    }`}
                  >
                    {qty === 0 ? "Agotado" : qty}
                  </span>
                </td>

                <td>
                  <button className="btn__edit" onClick={() => onEdit?.(p.id)}>
                    <Pencil size={14} />
                  </button>
                  <button className="btn__delete" onClick={() => onDelete?.(p.id)}>
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableProducts;
