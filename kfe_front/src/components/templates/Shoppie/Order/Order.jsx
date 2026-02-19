import {
  ShoppingBag,
  Trash2,
  ShoppingBag as ShoppingBagIcon,
} from "lucide-react";
import Swal from "sweetalert2";
import "./order.css";
import ShoppingCart from "../../../organisms/Shoppie/ShoppingCart";
import Subtotal from "../../../organisms/Shoppie/Subtotal";
import { createVenta } from "../../../../api/routes.js";
import generarTicketPDF from "./generarTicketPDF.js";

const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;

function Order({
  cart,
  increaseQty,
  decreaseQty,
  clearCart,
  subtotal,
  iva,
  total,
  onVentaSuccess, // ✅ NUEVO: refresca productos en el padre
}) {
  const handleClick = async () => {
    if (cart.length === 0) {
      Swal.fire("Carrito vacío", "Agrega productos antes de pagar", "info");
      return;
    }

    const totalPagar = round2(total);

    const { value: monto } = await Swal.fire({
      title: "Pago",
      html: `<p>Total a pagar: <b>$${totalPagar.toFixed(2)}</b></p>`,
      input: "number",
      inputLabel: "Monto con el que paga el cliente",
      inputAttributes: { min: totalPagar, step: "0.01" },
      inputPlaceholder: "Ej. 100.00",
      showCancelButton: true,
      confirmButtonText: "Confirmar pago",
      cancelButtonText: "Cancelar",
      preConfirm: (value) => {
        const pagado = round2(value);

        if (value === "" || value === null || value === undefined) {
          return Swal.showValidationMessage("Ingresa un monto");
        }

        if (Number.isNaN(pagado)) {
          return Swal.showValidationMessage("Monto inválido");
        }

        if (pagado < totalPagar) {
          return Swal.showValidationMessage(
            "La cantidad que pagó es incorrecta"
          );
        }

        return pagado;
      },
    });

    if (monto === undefined) return;

    const pagado = round2(monto);
    const cambio = round2(pagado - totalPagar);

    // ✅ Validación final de stock con lo que tienes en el carrito
    const bad = cart.find((it) => it.qty > Number(it.stock ?? 0));
    if (bad) {
      Swal.fire(
        "Stock insuficiente",
        `No hay suficiente de ${bad.name}`,
        "error"
      );
      return;
    }

    const items = cart.map((it) => ({
      producto_id: it.id,
      cantidad: it.qty,
      precio_unitario: round2(it.price),
      subtotal: round2(it.price * it.qty),
    }));

    const ticketItems = cart.map((it) => ({
      nombre: it.name,
      cantidad: it.qty,
      precio_unitario: round2(it.price),
      subtotal: round2(it.price * it.qty),
    }));

    try {
      Swal.fire({
        title: "Procesando...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await createVenta({ items });

      Swal.close();

      const ventaId = res.data?.venta_id ?? res.data?.id ?? "SIN-ID";
      const fecha = new Date().toLocaleString();

      await Swal.fire(
        "Pago confirmado",
        `Total: $${totalPagar.toFixed(2)}\nPagó: $${pagado.toFixed(
          2
        )}\nCambio: $${cambio.toFixed(2)}`,
        "success"
      );

      generarTicketPDF({
        folio: ventaId,
        fecha,
        items: ticketItems,
        subtotal: round2(subtotal),
        iva: round2(iva),
        total: totalPagar,
        pagado,
        cambio,
      });

      // ✅ Limpia carrito
      clearCart();

      // ✅ Refresca productos (stock) SIN recargar
      // (lo hace el padre ShopCoffe con getAllProducts)
      if (typeof onVentaSuccess === "function") {
        await onVentaSuccess();
      }
    } catch (err) {
      Swal.close();
      console.error("Error creando venta:", err);

      Swal.fire(
        "Error",
        err?.response?.data?.msg || "No se pudo registrar la venta",
        "error"
      );
    }
  };

  return (
    <div className="container__order">
      <div className="container__top">
        <header className="header__order">
          <div className="content__order">
            <ShoppingBag size={20} color="orange" />
            <span className="title__order">Orden Actual</span>
          </div>

          <button className="delete__btn" onClick={clearCart} type="button">
            <Trash2 size={16} color="red" />
          </button>
        </header>

        <div className={`container__lettler ${cart.length === 0 ? "empty" : ""}`}>
          {cart.length === 0 ? (
            <p style={{ padding: 12, color: "#666" }}>
              <ShoppingBagIcon size={16} color="#857870" style={{ marginRight: 6 }} />
              Selecciona productos del menu para agregar a la orden
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
                stock={item.stock}
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
            <button className="btn__payment" onClick={handleClick} type="button">
              Pagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;