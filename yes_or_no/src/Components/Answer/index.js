import React from 'react'
import './index.css'
function Answer() {
    return (
        <div className="textContainer">
            <h1 className="YesNoText ">
                {determineAnswer()}
            </h1>
        </div>
    )
}

export default Answer