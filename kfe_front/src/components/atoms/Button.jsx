import React from 'react'

function Button({classNameButton,nameButton, onClick}) {
  return (
    <button className={classNameButton} onClick={onClick}>{nameButton}</button>
  )
}

export default Button