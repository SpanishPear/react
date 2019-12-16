# PART ONE
## What is react:

React is a **web framework** and a Javascript Library that allows us to build single page applications (SPA).
Whilst React itself only delivers the view layer of the application, the surrounding "ecosystem" allows us to build full SPA's.

It's important to note that React is a framework, not a language. The language most commonly used for React is called JSX - a hybrid between Javascript and HTML. It provides a way for developers to structure components (using HTML) whilst simultaneously making use of Javascript for programmatic development. 


## ES6 Object Initialisation {# ObjInit}
 
Excerpts from Robin Wieruch. “The Road to learn React.”

```jsx
const name = 'Robin';

const user = {
  name: name,
};
```

is the same as 

```jsx
const name = 'Robin';

const user = {
  name,
};
```
.

Similarly, you can do function shorthands:

```jsx
// ES5
var userService = {
  getUserName: function (user) {
    return user.firstname + ' ' + user.lastname;
  },
};

// ES6
const userService = {
  getUserName(user) {
    return user.firstname + ' ' + user.lastname;
```
.

You can also do computed key names!
```jsx

// ES5
var user = {
  name: 'Robin',
};

// ES6
const key = 'name';
const user = {
  [key]: 'Robin',
};
```

## ES6/React Convention
  ### Immutable data structures
    * Return a new list, rather than the old "changed" list

  ### Binding
  * The binding step is necessary because class methods don’t automatically bind this to the class instance
  * ```jsx
        class ExplainBindingsComponent extends Component {
            onClickMe() {
                console.log(this);
            }

            render() {
                return (
                    <button
                        onClick={this.onClickMe}
                        type="button"
                    >
                        Click Me
                    </button>
                );
            }
        }
    ```
    ```
    * returns `undefined` - since the function `onClickMe` is not bound to the class
  * HOWEVER, arrow functions are auto-bound (yay!) so: 
  * ```jsx
        class ExplainBindingsComponent extends Component {
            onClickMe = () => {
                console.log(this);
            }

            render() {
                return (
                    <button
                        onClick={this.onClickMe}
                        type="button"
                    >
                        Click Me
                    </button>
                );
            }
        }
    ```
    ```

  ### Components
    * The building blocks of react applications literally. 
    * Instead of large components that we will copy and paste - we abstract them out into their own components.
    * Components are akin to functions.

## Splitting up components
Items passed as key/value pairs into the class sets the props array passed into the component

```jsx
class App extends Component { 
  render() {
    <search 
      value={searchTerm}
      onChange={()=>{doSomething()}}
    />
  }
}

class search extends Component {
  // Now, we can access these values through props
  // this is called object deconstruction
  render(){
    const {
         value,
         onChange
    } = this.props;
  }
}

```

## Types of components

  ### Functional Stateless Components
 * Functional Stateless Components are functions that take input and return an output. The inputs are the props, and the output is a component instance in plain JSX. So far, it is quite similar to an ES6 class component. However, functional stateless components are functions (functional) and they have no local state (stateless). You cannot access or update the state with this.state or this.setState() because there is no this object. Additionally, they have no lifecycle methods except for the render() method which will be applied implicitly in functional stateless components. 
 
 The constructor runs only once in the lifetime of a component, whereas the render() class method runs once in the beginning and every time the component updates. Keep in mind that functional stateless components have no lifecycle methods, when we arrive at lifecycle methods chapter later.

  ### ES6 Class Components
  * ES6 Class Components extend from the React component. The extend hooks all the lifecycle methods, available in the React component API, to the component. This is how we were able to use the render() class method. You can also store and manipulate state in ES6 class components using this.state and this.setState().

  ### React.createClass
  * React.createClass was used in older versions of React, and is still used in JavaScript ES5 React applications. But Facebook declared it as deprecated in favor of JavaScript ES6. They even added a deprecation warning in version 15.5.



# PART TWO

## Lifecycle Methods

  ### Mounting
  These methods are called in the following order when an instance of a component is being created and inserted into the DOM:

  #### constructor(props) {# constructor}
    * Called when component is initialised
    * Used to set initial states and bind methods to the component
  
  #### static getDerivedStateFromProps(props, state) {# getDerivedState}
    * Called before component rendered
      * Intial mount
      * Subsequent updates
    * Main use
      * Cases where state depends on changes to props over time
      * STATIC => No access to component instance
  #### render() {# render}
    * Mandatory lifecycle method
    * returns the element as output of the component
    * Shouldnt modify state or props
  #### componentDidMount() {# didMount}
    * Called once - when component mounts
    * perfect time to do an async fetch from an API
    * fetched data stored in local component
  
  ### Updating
  An update can be caused by changes to props or state. These methods are called in the following order when a component is being re-rendered:

  #### static getDerivedStateFromProps(props, state)
    [link](#static-getderivedstatefrompropsprops-state--getderivedstate)

  #### shouldComponentUpdate(nextProps, nextState)
    * Is always called when the component updates due to state or props changes. You will use it in mature React applications for performance optimization. 
    * Depending on a boolean that you return from this lifecycle method, the component and all its children will render or will not render on an update lifecycle. 
    * You can prevent the render lifecycle method of a component
  #### render()
  [render](#render--render)
  #### getSnapshotBeforeUpdate(prevProps, prefState)
    * Invoked before the most recently rendered output is committed to the DOM.
    * In rare cases, the component needs to capture information from the DOM before it is potentially changed. 
    * This lifecycle method enables the component to do it.
    * componentDidUpdate() will receive any value returned by getSnapshotBeforeUpdate() as a parameter.
  #### componentDidUpdate()
    * Invoked immediately after updating, but not for the initial render. 
    * You can use it as to perform DOM operations or to perform more asynchronous requests. 
    * If your component implements the getSnapshotBeforeUpdate() method, the value it returns will be received as the snapshot parameter.

  ### Unmounting
  This method is called when a component is being removed from the DOM:
  #### componentWillUnmount()
    * Used to clean up tasks
  
