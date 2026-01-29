import React from 'react'

const Card = (props) => {
  return (
    <div>
        <div className="feature-card">
              <div className="feature-img">
                <span className="feature-icon">{props.img}</span>
              </div>
              <h3 className="feature-title">{props.title}</h3>
              <p className="feature-description">
                {props.body}
              </p>
            </div>
    </div>
  )
}

export default Card