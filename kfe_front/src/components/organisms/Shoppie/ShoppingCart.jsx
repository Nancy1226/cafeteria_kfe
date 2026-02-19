function ShoppingCart({
  nameProduct,
  priceProduct,
  remove,
  productQuantity,
  add,
  subtotalPriceProduct,
  handleClickRemove,
  handleClickAdd,
  stock,
}) {
  return (
    <>
      <div className="content__lettler">
        <div className="content__lettler__info">
          <span className="lettler__title">{nameProduct}</span>
          <span className="lettler_price">${priceProduct.toFixed(2)} c/u</span>
        </div>
        <div className="content__lettler__add">
          <button className="action__btn" onClick={handleClickRemove}>
            {remove}
          </button>
          <span>{productQuantity}</span>
        <button
          className="action__btn"
          onClick={handleClickAdd}
          disabled={productQuantity >= stock}
        >
          {add}
        </button>
        </div>
        <span className="order__price">${subtotalPriceProduct.toFixed(2)}</span>
      </div>
    </>
  );
}

export default ShoppingCart;
