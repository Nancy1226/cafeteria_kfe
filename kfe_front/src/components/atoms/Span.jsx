import React from 'react'

function Span({classNameSpan, priceCard}) {
  return (
    <span className={classNameSpan}>{priceCard}</span>
  )
}

export default Span