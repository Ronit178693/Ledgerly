import React from 'react'

const TopCards = (props) => {
  return (
    <div>
          <div className={props.class1}>
            <div className="stat-content-wrapper">
              <div className="stat-content">
                <p className="stat-label">{props.title}</p>
                {props.amount}
              </div>
              <div className={props.class2}>
                {props.icon}
              </div>
            </div>
          </div>
    </div>
  )
}

export default TopCards