import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Box extends React.Component{
	selectBox = () => {
		this.props.selectBox(this.props.row, this.props.col)
	}
	render() {
		return(
			<div
				className={this.props.boxClass}
				id={this.props.id}
				onClick={this.selectBox}
			/>
		)
	}
}


class Grid extends React.Component {

	render() {
		const width = (this.props.cols * 16);
		var rowsArr = []
	 	var boxClass = "";
		
		//could be replaced with map function
		for (let i = 0; i < this.props.rows; i++){
			for(let j = 0; j < this.props.rows; j++){
				let boxId = i + "_" + j;
				boxClass = this.props.gridFull[i][j] ? "box on" : "box off";

				rowsArr.push(
					<Box
						boxClass={boxClass}
						key={boxId}
						boxId={boxId}
						row={i}
						col={j}
						selectBox={this.props.selectBox}

					/>

				);
			}
		}

		return(
			<div className="grid" style={{width:width}}>
				{rowsArr}
			</div>
		)
		
	}
}




class Main extends React.Component {
	constructor() {
		super();
		this.speed = 100;
		this.rows = 30;
		this.cols = 50;
		this.state = {
			generation: 0,
			//Fills the grid with FALSE initially
			gridFull: Array(this.rows).fill().map( () => Array(this.cols).fill(false))
		}
	}

	selectBox = (row,col) =>{
		//.slice wont work because gridFull is 2D array
		//https://blog.andrewray.me/how-to-clone-a-nested-array-in-javascript/
		let grid = JSON.parse(JSON.stringify(this.state.gridFull))
		console.log(grid);
		grid[row][col] = !grid[row][col];
		this.setState({
			gridFull: grid
		})
	}

	seed = () => {
		console.log("SEEDED");
		let grid = JSON.parse(JSON.stringify(this.state.gridFull))
		for (let i = 0; i < this.rows; i++){
			for(let j = 0; j < this.rows; j++){
				//random number between 0 and 4, if 1 then: 
				let random = Math.floor(Math.random() * 4);
				if(random === 1) {
					grid[i][j] = true;
				}
			}
		}

		this.setState({
			gridFull: grid
		});
	}

	componentDidMount() {
		this.seed()
	}
    render() {
        return (
            <div>
                <h1>
					Conways Game of Life!
				</h1>
				<script>console.log(this.state.gridFull)</script>
				<Grid
					gridFull={this.state.gridFull}
					rows={this.rows}
					cols={this.cols}
					selectBox={this.selectBox}
				/>
				<h2>
					Generation: {this.state.generation}
				</h2>
				{/* <Run
				
				/> */}
            </div>
        )
    } 
}


//render main on the root node
ReactDOM.render(<Main/>, document.getElementById('root'));

