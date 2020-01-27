import React from 'react'
import './index.css'
function ProgressBar() {
    // progress bar ++ 
    return (
        <div className="barContainer">
            <p className="calculatingText">Calculating...</p>
            <div className="myBar">10%</div>
        </div>
    )

}

export default ProgressBar