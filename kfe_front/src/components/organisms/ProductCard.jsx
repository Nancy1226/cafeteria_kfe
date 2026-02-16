import React from 'react'
import Card from '../molecules/Card'

function ProductCard({src, alt, titleCard, priceCard, descriptionCard, nameButton, onClick}) {
  return (
    <>
      <Card src={src} alt={alt} titleCard={titleCard} priceCard={priceCard} descriptionCard={descriptionCard} nameButton={nameButton} onClick={onClick} />
    </>
  )
}

export default ProductCard;