import React from "react";

function Subtotal({ subtotal, iva }) {
  return (
    <>
      <div className="content__subtotal">
        <div className="content__subtotal__info">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="content__subtotal__price">
          <span>IVA (16%)</span>
          <span>{iva.toFixed(2)}</span>
        </div>
      </div>
    </>
  );
}

export default Subtotal;
