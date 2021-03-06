import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => (setVisible(!visible))

  useImperativeHandle(ref, () => {
    return {toggleVisibility}
  })

  return (
    <div>
      <div>
        <button type="button" onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
