import React from 'react'

function Image({src, alt, classNameImg}) {
  return (
        <img className={classNameImg} src={src} alt={alt} />
  )
}



export default Image;