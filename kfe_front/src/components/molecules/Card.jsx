import './card.css'
import Button from '../atoms/Button'
import Image from '../atoms/Image'
import Span from '../atoms/Span'
import Title from '../atoms/Title'
import P from '../atoms/P'

function Card({src, alt, nameButton, onClick, titleCard, priceCard, descriptionCard}) {
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
          </div>
          <div className="content__btn">
            <Button classNameButton={"btn__add"} nameButton={nameButton} onClick={onClick} />
          </div>
      </div>
    </>
  )
}

export default Card;