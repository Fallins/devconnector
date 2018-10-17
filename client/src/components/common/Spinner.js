import React from 'react'

const spinner = 'https://loading.io/spinners/microsoft/lg.rotating-balls-spinner.gif'

export default () => {
  return (
    <div>
      <img 
        src={spinner} 
        alt="Loading"
        style={{ width: '200px', margin: 'auto', display: 'block' }} />
    </div>
  )
}
