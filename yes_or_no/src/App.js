import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
	super(props);
    this.move = this.move.bind(this);
  }

  // progress bar ++ 
  move() {
	var i = 0;
	var lines = [
		"Calculating population density of nearby bars...",
		"Comparing alcohol prices with bank balance...", 
		"Determining travel cost...", 
		"Determining travel distance...", 
		"Checking social battery...",
		"Done"
	]
    if (i === 0) {
		i = 1;
		var elem = document.getElementsByClassName("myBar").item(0);
		var text = document.getElementsByClassName("calculatingText").item(0)
		var width = -1;
		var id = setInterval(() => {
			if (width % 20 === 0) {	
				console.log(width/20 -1)
				text.innerText = lines[width/20 ];
			}
			if (width >= 100) {
				clearInterval(id);
				i = 0;
				var answer = document.getElementsByClassName("YesNoText").item(0)
				answer.style.display = "inline-block"
			} else {
				width++;
				elem.style.width = width + "%";
				elem.innerHTML = width  + "%";
			}
		}, 80);
    }
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
        <div className="barContainer">
			<p className="calculatingText">Calculating...</p>
			<div className="myBar">10%</div>
        </div>

        <div className="App">
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