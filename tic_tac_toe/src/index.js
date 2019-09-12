import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//---------------------------------
//        SQUARE COMPONENT
//---------------------------------
function Square(props) {

    return (
      <button className="square confetti-button" onClick={((e) => {
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

//---------------------------------
//          BOARD COMPONENT
//---------------------------------
class Board extends React.Component {



  renderSquare(i) {
    //returns a square component with vlaue i
    return <Square 
      value={this.props.squares[i]}
      onClick={(e)=>{this.props.onClick(i)}}
    />;
  }
  

  render() {
  
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

//---------------------------------
//          GAME COMPONENT
//---------------------------------
class Game extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      history: [{
          squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    }
  }


  handleClick(i) {
    //copy the data so we can mutate it safely
    const history = this.state.history.slice(0,this.state.stepNumber+1);
    const current = history[history.length -1]
    const squares = current.squares.slice();
    
    // console.log('Winner: ' + calculateWinner(squares) + 'so state is'+ !!!calculateWinner(squares));
    //! Triple exclamation for type conversion + inverting. 
    if(!!!squares[i] && !!!calculateWinner(squares)){
      // console.log(squares[i]);
      squares[i] = (this.state.xIsNext) ? 'X' : 'O'
      //push muttates the original array
      //concat merges history with the new squares
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber:  history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
    
    
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      //because if it's divisible by 2 then X must be next
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    //renders the step we choose!
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    //every time we render, check if there's a winner

    const moves = history.map((step,move)=>{
      const desc = move ?
        'Go to move #' + move :
        'Go to game start' ;
      return (
        <li key={move}>
          <button style={{width: 200 + 'px', padding: 0+'px'}}  onClick = {()=>{this.jumpTo(move)}}>{desc}</button>
        </li>
      );
    })

    let status = (winner) ? 'Winner:  ' + winner : ('Next player: ' + (this.state.xIsNext ? 'X' : 'O'));

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            className = "confetti-button"
            squares = {current.squares}
            onClick ={(i)=>this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  //each winning combination
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    //ie for i = 0, a = 0, b = 1, c = 2
    const [a, b, c] = lines[i];
    //!! for explicit type conversion
    if (!!squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return (squares.includes(null)) ? null : 'It\'s a draw!';
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

