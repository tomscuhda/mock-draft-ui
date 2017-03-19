import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component {
    render() {
        return (
            <h1>Hello, World</h1>
        );
    }
}

ReactDOM.render(
    <Component/>,
    document.getElementById('container')
);