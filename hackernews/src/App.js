import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';


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
      result: null,
      searchTerm: DEFAULT_QUERY,
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    
    // to access the this.onDismiss function
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
      // returns true/false
      const isNotId = item => item.objectID !== id;

      // filter removes all items where function returns false
      const updatedHits = this.state.result.hits.filter(isNotId);

      // use es6+ object spread syntax :) 
      this.setState({
        result: { ...this.state.result, hits: updatedHits }
      });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  setSearchTopStories(result) {
    this.setState({result});
    console.log(this.state)
  }
  
  // invoked immediately after updating
  // but not initial render
  componentDidMount() {
  
    // deconstruct the state
    const { searchTerm } = this.state;

    // async mâgìç
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);

  }

  render() {
    const { searchTerm , result } = this.state;
    if (!result) {return null;}
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

          { result &&
            <Table
              list={result.hits}
              pattern={searchTerm}
              onDismiss={this.onDismiss}
            />
          }
          
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