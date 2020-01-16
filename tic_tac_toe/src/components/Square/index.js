import React from 'react';
import './index.css';

//---------------------------------
//        SQUARE COMPONENT
//---------------------------------

function Square(props) {

    return (
      <button 
        className="square confetti-button" 
        onClick={((e) => {
            console.log(e.target);
            var animateButton = function(e) {
              //reset animation
              e.target.classList.remove('animate');
              e.target.classList.add('animate');
              setTimeout(function(){
                e.target.classList.remove('animate');
                console.log('heyy');
              },700);
            };

          var classname = document.getElementsByClassName("confetti-button");

          for (var i = 0; i < classname.length; i++) {
            classname[i].addEventListener('click', animateButton, false);
          }
          
          props.onClick();
        
        })}>

        {props.value}
      </button>
    ); 
}

export default Square
