import React from 'react'

function Title({classNameTitle, titleCard}) {
  return (
    <h3 className={classNameTitle}>{titleCard}</h3>
  )
}

export default Title