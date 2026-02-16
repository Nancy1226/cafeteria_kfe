import {
  ShoppingBag,
  Trash2,
  ShoppingCart as ShoppingCartIcon,
} from "lucide-react";
import Swal from "sweetalert2";
import "./order.css";
import ShoppingCart from "../../organisms/ShoppingCart";
import Subtotal from "../../organisms/Subtotal";

function Order({
  cart,
  increaseQty,
  decreaseQty,
  clearCart,
  subtotal,
  iva,
  total,
}) {
  const handleClick = () => {
    Swal.fire({
      title: "¿Deseas confirmar tu compra?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, confirmar compra",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "¡Compra confirmada!",
          "Tu compra ha sido confirmada.",
          "success",
        );
      }
    });
  };

  return (
    <>
      <div className="container__order">
        <div className="container__top">
          <header className="header__order">
            <div className="content__order">
              <ShoppingBag size={20} color="orange" />
              <span className="title__order">Orden Actual</span>
            </div>
            <button className="delete__btn" onClick={clearCart}>
              <Trash2 size={16} color="red" />
            </button>
          </header>

          <div className={`container__lettler ${cart.length === 0 ? "empty" : ""}`}>
            {cart.length === 0 ? (
              <p style={{ padding: 12, color: "#666"}}>
                <ShoppingCartIcon
                  size={16}
                  color="#E2732C"
                  style={{ marginRight: 6 }}
                />
                No hay productos seleccionados
              </p>
            ) : (
              cart.map((item) => (
                <ShoppingCart
                  key={item.id}
                  nameProduct={item.name}
                  priceProduct={item.price}
                  productQuantity={item.qty}
                  subtotalPriceProduct={item.price * item.qty}
                  remove="-"
                  add="+"
                  handleClickRemove={() => decreaseQty(item.id)}
                  handleClickAdd={() => increaseQty(item.id)}
                />
              ))
            )}
          </div>
        </div>

        <div className="container__end">
          <div className="container__subtotal">
            <Subtotal
              subtotal={Number(subtotal.toFixed(2))}
              iva={Number(iva.toFixed(2))}
            />
          </div>

          <div className="container__total">
            <div className="content__total__info">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="payment__btn">
              <button className="btn__payment" onClick={handleClick}>
                Pagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
