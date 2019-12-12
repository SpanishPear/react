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


  render() {
    const isSearched = (searchTerm) => (item) => item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const {searchTerm, list} = this.state;
    return (
      <div className="App">
          {/* For all items in list, return the title in a div */}
          <form>
            <input
              type="text"
              onChange= {(event)=> {
                  let searchTerm = event.target.value;
                  this.setState({searchTerm});
              }}
            />
          </form>
          
          {/*  repeat for all items that have the search term*/}
          {
            list.filter(isSearched(searchTerm)).map( (item) => 
              <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              {/* button that calls the local onDismiss function*/}
              <span>
                <button
                  onClick={() => this.onDismiss(item.objectID)}
                  type="button"
                >
                    Dismiss
                </button>
              </span>
            </div>
            )
          }
      </div>
    );
  }
}

export default App;