import React, { Component } from 'react';
import './index.css';
import axios from 'axios';

import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
} from '../../constants';
import { Search } from '../Search';
import { Table } from '../Table';
import { Button } from '../Button';

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
    const { hits, page } = result.data;
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
    // axios defaults to get
    // can also use axios.get()
    const params = {
      [PARAM_SEARCH] : searchTerm,
      [PARAM_PAGE] : page,
      [PARAM_HPP] : DEFAULT_HPP
    }
    axios(`${PATH_BASE}${PATH_SEARCH}`, {params})
      .then(result => {
        console.log(result)
        this.setSearchTopStories(result)
      })
      // .then(result => console.log(result))
      .catch(error => {
        console.log(error)
        this.setState({error}
      )});
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
              {console.log(error)}
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

export default App;

export {
  Button,
  Search,
  Table,
};