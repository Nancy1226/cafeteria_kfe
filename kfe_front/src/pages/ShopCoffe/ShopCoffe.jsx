import { useMemo, useState } from "react";
import "./shopCoffe.css";
import TopBar from '../../components/organisms/TopBar/TopBar'
import Menu from '../../components/templates/Menu/Menu'
import Order from '../../components/templates/Order/Order'

const IVA_RATE = 0.16;

function ShopCoffe() {
  const [cart, setCart] = useState([]); 

    const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

 const increaseQty = (id) => {
  setCart((prev) =>
    prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
  );
};

const decreaseQty = (id) => {
  setCart((prev) =>
    prev
      .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
      .filter((item) => item.qty > 0) // si llega a 0 lo quita
  );
};

const clearCart = () => setCart([]);

const subtotal = useMemo(
  () => cart.reduce((acc, item) => acc + item.price * item.qty, 0),
  [cart]
);

const iva = useMemo(() => subtotal * IVA_RATE, [subtotal]);
const total = useMemo(() => subtotal + iva, [subtotal, iva]);

const handleLogout = () => {
  localStorage.removeItem("token");
  clearCart(); // si quieres limpiar carrito
  navigate("/admin"); // si usas router
};


  return (
    <>
    <TopBar nameCoffeShop={'Cafeteria KFE'} roleUser={'admin'} handleLogout={handleLogout} />
    <div className="container__body">
      <Menu addToCart={addToCart} />
      <Order cart={cart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        clearCart={clearCart}
        subtotal={subtotal}
        iva={iva}
        total={total}
      />
    </div>
    </>
  )
}

export default ShopCoffe;
