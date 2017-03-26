import React from 'react';
import ReactDOM from 'react-dom';

import { DraftBoardContainer } from './components/draft-board';
import './scss/styles.scss';

const PLAYERS = [
    {
        name: 'Myles Garrett',
        position: 'DE',
        school: 'Texas A&M',
        forty: 4.4,
        id: 1
    },
    {
        name: 'Mike Williams',
        position: 'WR',
        school: 'Clemson',
        forty: 3.4,
        id: 2
    },
    {
        name: 'Solomon Thomas',
        position: 'DE',
        school : 'Ohio State',
        forty: 5.4,
        id: 3
    }
]

class MockDraft extends React.Component {
    render() {
        return (
            <DraftBoardContainer players={ PLAYERS }/>
        );
    }
}

ReactDOM.render(
    <MockDraft/>,
    document.getElementById('container')
);