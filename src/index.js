import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import io from 'socket.io-client';

import { DraftBoardContainer } from './components/draft-board';
import './scss/styles.scss';

const socket = io('http://localhost:3000');
socket.on('broadcast', data => {
    console.log(data);
});

class MockDraft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: []
        };
    }
    componentDidMount() {
        axios.get('http://localhost:3000/players')
            .then(res => {
                this.setState({
                    players: res.data
                });
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <DraftBoardContainer players={this.state.players} />
        );
    }
}

ReactDOM.render(
    <MockDraft />,
    document.getElementById('container')
);