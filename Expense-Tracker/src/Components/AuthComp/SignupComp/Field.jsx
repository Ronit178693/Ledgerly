import React from 'react'


const Field = (props) => {
  return (
    <div>
        <div className="form-group">
            <label htmlFor={props.for}>{props.label}</label>
            <div className="input-wrapper">
              {props.logo}
              {props.formInput}
            </div>
          </div>

    </div>
  )
}

export default Field