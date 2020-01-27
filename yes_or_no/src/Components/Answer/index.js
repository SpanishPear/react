import React from 'react'
import './index.css'
function Answer() {
    // determines 'yes' or 'no
    function determineAnswer() {
        if (Math.floor(Math.random() * Math.floor(2))  ){
            return 'Yes'
        } else {
            return 'No'
        }
    }
      
    return (
        <div className="textContainer">
            <h1 className="YesNoText ">
                {determineAnswer()}
            </h1>
        </div>
    )
}

export default Answer