import React from 'react';
import './App.css';
import ProgressBar from './Components/ProgressBar';
import Heading from './Components/Heading'
class App extends React.Component {

  constructor(props) {
	super(props);
    this.move = this.move.bind(this);
  }

  // progress bar ++ 
  move() {
    let lines = [
      "Calculating population density of nearby bars...",
      "Comparing alcohol prices with bank balance...", 
      "Determining travel cost...", 
      "Determining travel distance...", 
      "Checking social battery...",
      "Done"
    ]
    let  elem = document.getElementsByClassName("myBar").item(0);
    let text = document.getElementsByClassName("calculatingText").item(0)
    let width = -1;
    
    let id = setInterval(() => {
      if (width % 20 === 0) {	
        console.log(width/20 -1)
        text.innerText = lines[width/20 ];
      }
      if (width >= 100) {
        clearInterval(id);
        var answer = document.getElementsByClassName("YesNoText").item(0)
        answer.style.display = "inline-block"
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width  + "%";
      }
    }, 80);
  
  }


  render() {
    // determines 'yes' or 'no
    function determineAnswer() {
      if (Math.floor(Math.random() * Math.floor(2))  ){
        return 'Yes'
      } else {
        return 'No'
      }
    }

    
    return (
      <div>
        <Heading/>
        <ProgressBar />

        <div className="textContainer">
          <h1 className="YesNoText ">
            {determineAnswer()}
          </h1>
        </div>

      </div>
    );
  }

  // When the page loads, call this
  componentDidMount() {
    window.addEventListener('load', this.move);
  }
}

export default App;