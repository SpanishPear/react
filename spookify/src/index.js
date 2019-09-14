import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Lunicode from './Lunicode.js';

class Main extends React.Component {

    render(){
        var test = new Lunicode();
        test.tools.creepify.options.maxHeight = 3;
        test.tools.creepify.options.middle = false;

        var encoded = test.tools.creepify.encode('hello')
        console.log(encoded);
        return(
            <div>
                <h1>{encoded}</h1>
            </div>
        )
    }
}



ReactDOM.render(<Main />, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
