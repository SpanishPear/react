import React, { Component } from 'react';
import './App.css';


const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

// return a higher order function
// the first function is given the searchTerm
// second function is the one passed to the filter function, so has access to the item from filter

class App extends Component {

  constructor(props) {
    // sets this.props = props;
    super(props);

    // state acts as internal memory
    // an object
    this.state = {
      list,
      searchTerm : '',
    };
    
    // to access the this.onDismiss function
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
      // returns true/false
      const isNotId = item => item.objectID !== id;
      
      // filter removes all items where function returns false
      const updatedList = this.state.list.filter(isNotId);

      // actually update the state
      this.setState({ 
        list: updatedList
      });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const {searchTerm, list} = this.state;
    return (
      <div className="page">
          {/* For all items in list, return the title in a div */}
          <div className="interactions">
            <Search 
              value={searchTerm}
              onChange={this.onSearchChange}
            >
              <p style={{display:"inline-block", paddingRight: "20px"}}>Search</p>
            </Search>
          </div>

          <Table
            list={list}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          /> 
          {/*  repeat for all items that have the search term*/}

      </div>
    );
  }
}

const Search = ({value, onChange, children}) => {
  return(
    <form>
      {children}
      <input
        type="text"
        onChange= {onChange}
        // what's the point of this line...?
        value={value}
      />
    </form>
  )
}

const Table = ({list, pattern, onDismiss}) =>{
  const isSearched = (searchTerm) => (item) => item.title.toLowerCase().includes(searchTerm.toLowerCase());
  
  const largeColumn = {
    width: '40%',
  };
  
  const midColumn = {
    width: '30%',
  };
  
  const smallColumn = {
    width: '10%',
  }

  return(
    <div className="table">
      {list.filter(isSearched(pattern)).map( (item) => 
        <div key={item.objectID} className="table-row">
          <span style={largeColumn}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={midColumn}>{item.author}</span>
          <span style={smallColumn}>{item.num_comments}</span>
          <span style={smallColumn}>{item.points}</span>
          {/* button that calls the local onDismiss function*/}
          <span style={smallColumn}>
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              Dismiss
            </Button>
          </span>
        </div>
      )}
    </div>

  );
}


class Button extends Component {
  render() {
    const {
      onClick,
      className = '',
      children,
    } = this.props;

    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    );
  }
}
export default App;