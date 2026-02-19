import './card.css'
import Button from '../atoms/Button'
import Image from '../atoms/Image'
import Span from '../atoms/Span'
import Title from '../atoms/Title'
import P from '../atoms/P'

  function Card({
    src,
    alt,
    nameButton,
    onClick,
    titleCard,
    priceCard,
    descriptionCard,
    stock, 
  }) {
  return (
    <>
      <div className='container__product'>
        <div className='content__image'>
          <Image classNameImg={"image__product"} src={src} alt={alt} />
        </div>
   
          <div className='product__info'>
            <Title classNameTitle={"product__title"} titleCard={titleCard}/>
            <P classNameDescription={"product__description"} descriptionCard={descriptionCard} />
            <Span classNameSpan={"product__price"}  priceCard={priceCard} />
              {stock !== undefined && (
              <span
                className={`product__stock ${
                  stock > 0 ? "available" : "empty"
                }`}
              >
                {stock > 0 ? `Disponible: ${stock}` : "Sin stock"}
              </span>
              )}
          </div>
          <div className="content__btn">
          <button
            className="btn__add"
            onClick={onClick}
            disabled={stock === 0}
          >
            {stock === 0 ? "Agotado" : nameButton}
          </button>
          </div>
      </div>
    </>
  )
}

export default Card;