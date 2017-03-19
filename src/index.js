import React from 'react';
import ReactDOM from 'react-dom';

import { FilterableDraftBoard } from './components/draft-board';
import './scss/styles.scss';

const PLAYERS = [
    {
        name: 'Myles Garrett',
        position: 'DE',
        school: 'Texas A&M',
        id: 1
    },
    {
        name: 'Mike Williams',
        position: 'WR',
        school: 'Clemson',
        id: 2
    },
    {
        name: 'Solomon Thomas',
        position: 'DE',
        school : 'Ohio State',
        id: 3
    }
]

class MockDraft extends React.Component {
    render() {
        return (
            <FilterableDraftBoard players={ PLAYERS }/>
        );
    }
}

ReactDOM.render(
    <MockDraft/>,
    document.getElementById('container')
);