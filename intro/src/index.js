import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//---------------------------------
//        SQUARE COMPONENT
//---------------------------------
function Square(props) {

    return (
      <button className="square" onClick={() => {props.onClick()}}>
        {props.value}
      </button>
    );
  
}

//---------------------------------
//          BOARD COMPONENT
//---------------------------------
class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }


  renderSquare(i) {
    //returns a square component with vlaue i
    return <Square 
      value={this.state.squares[i]}
      onClick={()=>{this.handleClick(i)}}
    />;
  }
  
  handleClick(i) {
    //copy the data so we can mutate it safely
    const squares = this.state.squares.slice();
    // console.log('Winner: ' + calculateWinner(squares) + 'so state is'+ !!!calculateWinner(squares));
    //! Triple exclamation for type conversion + inverting. 
    if(!!!squares[i] && !!!calculateWinner(squares)){
      console.log(squares[i]);
      squares[i] = (this.state.xIsNext) ? 'X' : 'O'
      this.setState({squares: squares, xIsNext: !this.state.xIsNext,});
    }
  }

  render() {
    //every time we render, check if there's a winner
    const winner = calculateWinner(this.state.squares);
    console.log(!!winner);
    const status = (winner) ? 'Winner:  '+ winner:('Next player: ' + (this.state.xIsNext ? 'X' : 'O'));

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

