import "./order.css";
import { ShoppingBag, Trash2 } from "lucide-react";

function Order() {
  return (
    <>
      <div className="container__order">
        <div className="container__top">
        <header className="header__order">
          <div className="content__order">
            <ShoppingBag size={20} color="orange" />
            <h2 className="title__order">Orden Actual</h2>
          </div>
          <button className="delete__btn">
            <Trash2 size={16} color="red" />
          </button>
        </header>

        <div className="container__lettler">
          <div className="content__lettler">
            <div className="content__lettler__info">
              <span className="lettler__title">Americano</span>
              <span className="lettler_price">$40.00 c/u</span>
            </div>
            <div className="content__lettler__add">
              <button className="action__btn">-</button>
              <span>1</span>
              <button className="action__btn">+</button>
            </div>
            <span className="order__price">$40.00</span>
          </div>
        </div>
        </div>

        <div className="container__end">
          <div className="container__subtotal">
            <div className="content__subtotal">
              <div className="content__subtotal__info">
                <span>Subtotal</span>
                <span>$40.00</span>
              </div>
              <div className="content__subtotal__price">
                <span>Iva (16%)</span>
                <span>$6.40</span>
              </div>
            </div>
          </div>

          <div className="container__total">
            <div className="content__total__info">
              <span>Total</span>
              <span>$46.40</span>
            </div>
            <div className="payment__btn">
              <button className="btn__payment">Pagar</button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Order;
