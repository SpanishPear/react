import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

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
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    // to access the this.onDismiss function
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);

  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    
    // remove the dismissed item from hits
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  // when the text in the search form changes
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  // called when someone presses the search button/enter
  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    
    // set the key in mem, then fetch
    this.setState({ searchKey: searchTerm });
    
    if (!this.state.results[searchTerm]) {
      this.fetchSearchTopStories(searchTerm);
    }
    
    // prevent the reloading!
    event.preventDefault();
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const {searchKey, results} = this.state;

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }
  
  
  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      // .then(result => console.log(result))
      .catch(error => this.setState({error}));
  }
  // invoked immediately after updating
  // but not initial render
  componentDidMount() {
    // deconstruct the state
    const { searchTerm } = this.state;
    this.setState({searchKey: searchTerm});
    this.fetchSearchTopStories(searchTerm);
  }
 
  render() {
    const { searchTerm , results, searchKey, error} = this.state;
    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits) || [];

    return (
      <div className="page">

          {/* For all items in list, return the title in a div */}
          <div className="interactions">
            <Search 
              value={searchTerm}
              onChange={this.onSearchChange}
              onSubmit={this.onSearchSubmit}
            >
              <p style={{display:"inline-block", paddingRight: "20px"}}>Search</p>
            </Search>
          </div>
          
          {/* Error messasge if it exists! */}
          {error ? 
            <div className="interactions">
              <p>Something went wrong.</p>
            </div>
            : 
            <Table
              list={list}
              onDismiss={this.onDismiss}
            />
          }
          <div className="interactions">
            <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
              More
            </Button>
          </div>
          {/*  repeat for all items that have the search term*/}

      </div>
    );
  }
}

const Search = ({
  value,
  onChange,
  onSubmit,
  children
}) =>
  <form onSubmit={onSubmit}>
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type="submit">
      {children}
    </button>
  </form>

const Table = ({list, onDismiss}) =>{
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
      {list.map( (item) => 
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