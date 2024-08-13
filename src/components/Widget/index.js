import React from 'react'
//css
import "./widget.css"


const Widget = ({widget}) => {
  return (
    <div className="widget-card">
        <div className="widget-card-name">
            {widget.name}
        </div>
        <div className="widget-card-text">
           {widget.text}
        </div>
    </div>
  )
}

export default Widget