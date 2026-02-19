import Card from "../../molecules/Card";

function ProductCard({
  src,
  alt,
  titleCard,
  priceCard,
  descriptionCard,
  nameButton,
  onAdd,
  stock,
}) {
  return (
    <>
      <Card
        src={src}
        alt={alt}
        titleCard={titleCard}
        priceCard={priceCard}
        descriptionCard={descriptionCard}
        nameButton={nameButton}
        onClick={onAdd}
        stock={stock}
      />
    </>
  );
}

export default ProductCard;
