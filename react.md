# ES6 Object Initialisation {# ObjInit}
 
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

# ES6/React Convention
  * Immutable data structures
  * Return a new list, rather than the old "changed" list
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

# Splitting up components
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

# Types of components

 * Functional Stateless Components are functions that take input and return an output. The inputs are the props, and the output is a component instance in plain JSX. So far, it is quite similar to an ES6 class component. However, functional stateless components are functions (functional) and they have no local state (stateless). You cannot access or update the state with this.state or this.setState() because there is no this object. Additionally, they have no lifecycle methods except for the render() method which will be applied implicitly in functional stateless components. 
 
 The constructor runs only once in the lifetime of a component, whereas the render() class method runs once in the beginning and every time the component updates. Keep in mind that functional stateless components have no lifecycle methods, when we arrive at lifecycle methods chapter later.

  * ES6 Class Components extend from the React component. The extend hooks all the lifecycle methods, available in the React component API, to the component. This is how we were able to use the render() class method. You can also store and manipulate state in ES6 class components using this.state and this.setState().

  * React.createClass was used in older versions of React, and is still used in JavaScript ES5 React applications. But Facebook declared it as deprecated in favor of JavaScript ES6. They even added a deprecation warning in version 15.5.
