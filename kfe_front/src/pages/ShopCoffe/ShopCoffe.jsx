// ShopCoffe.jsx
import { useMemo, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./shopCoffe.css";
import TopBar from "../../components/organisms/Shoppie/TopBar/TopBar";
import Menu from "../../components/templates/Shoppie/Menu/Menu";
import Order from "../../components/templates/Shoppie/Order/Order";
import { getAllProducts } from "../../api/routes.js"; // <-- ajusta ruta si cambia

const IVA_RATE = 0.16;

function ShopCoffe() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);

  const refreshProducts = useCallback(async () => {
    try {
      setProductsError(null);
      setLoadingProducts(true);
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (e) {
      setProductsError("No se pudieron cargar productos");
      console.error(e);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      const stock = Number(product.stock ?? 0);

      if (stock <= 0) {
        Swal.fire("Sin stock", "Este producto está agotado", "info");
        return prev;
      }

      if (exists) {
        if (exists.qty >= stock) {
          Swal.fire("Stock insuficiente", `Solo hay ${stock} disponibles`, "warning");
          return prev;
        }
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const stock = Number(item.stock ?? 0);
        if (item.qty >= stock) {
          Swal.fire("Stock insuficiente", `Solo hay ${stock} disponibles`, "warning");
          return item;
        }
        return { ...item, qty: item.qty + 1 };
      })
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => setCart([]);

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.qty, 0),
    [cart]
  );
  const iva = useMemo(() => subtotal * IVA_RATE, [subtotal]);
  const total = useMemo(() => subtotal + iva, [subtotal, iva]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Cerrar sesión",
      text: "¿Seguro que quieres salir?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    localStorage.removeItem("token");
    localStorage.removeItem("loggedUser");
    navigate("/", { replace: true });
  };

  return (
    <>
      <TopBar
        nameCoffeShop="Cafeteria KFE"
        goToVentas={() => navigate("/ventas")}
        goToInventario={() => navigate("/inventario")}
        goToGrapics={() =>navigate("/reportes")}
        onLogout={handleLogout}
      />

      <div className="container__body">
        <Menu
          products={products}
          loading={loadingProducts}
          error={productsError}
          addToCart={addToCart}
        />

        <Order
          cart={cart}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          clearCart={clearCart}
          subtotal={subtotal}
          iva={iva}
          total={total}
          onVentaSuccess={refreshProducts}
        />
      </div>
    </>
  );
}

export default ShopCoffe;
