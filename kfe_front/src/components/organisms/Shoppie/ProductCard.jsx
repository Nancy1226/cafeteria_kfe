import Card from "../../molecules/Card";

function ProductCard({
  src,
  alt,
  titleCard,
  priceCard,
  descriptionCard,
  nameButton,
  onAdd,
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
      />
    </>
  );
}

export default ProductCard;
