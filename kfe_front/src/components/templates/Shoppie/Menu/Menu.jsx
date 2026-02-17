import "./menu.css";
import ProductCard from "../../../organisms/Shoppie/ProductCard";

const products = [
{
  id: "cafe-esquina",
  title: "Café de la Esquina",
  price: 40.0,
  description: "Café recién preparado con granos de calidad premium.",
  img: "https://images.pexels.com/photos/18238543/pexels-photo-18238543.jpeg",
},
];

function Menu({ addToCart }) {

  return (
    <>
    <div className="container__menu">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          src={p.img}
          titleCard={p.title}
          priceCard={`$${p.price.toFixed(2)}`}
          descriptionCard={p.description}
          nameButton={"Agregar"}
          onAdd={() => addToCart({ id: p.id, name: p.title, price: p.price })}
        />
      ))} 
    </div>
    </>
  );
}

export default Menu;
