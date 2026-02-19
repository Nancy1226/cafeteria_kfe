// Menu.jsx
import "./menu.css";
import ProductCard from "../../../organisms/Shoppie/ProductCard";

function Menu({ products, loading, error, addToCart }) {
  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;

  return (
    <div className="container__menu">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          src={p.imagen_url}
          titleCard={p.nombre}
          priceCard={`$${Number(p.precio ?? 0).toFixed(2)}`}
          descriptionCard={p.descripcion}
          nameButton="Agregar"
          stock={p.stock}
          onAdd={() =>
            addToCart({
              id: p.id,
              name: p.nombre,
              price: Number(p.precio ?? 0),
              stock: p.stock,
            })
          }
        />
      ))}
    </div>
  );
}

export default Menu;
