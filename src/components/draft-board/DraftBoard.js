import React from 'react';

import './DraftBoard.scss';

export class DraftBoardContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            filterBy: 'name',
        }
        this.handleFilterByChange = this.handleFilterByChange.bind(this);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterByChange(e) {
        this.setState({
            filterBy: e.target.value
        });
    }

    handleFilterTextChange(e) {
        this.setState({
            filterText: e.target.value
        });
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    filterBy={this.state.filterBy}
                    handleFilterByChange={this.handleFilterByChange}
                    handleFilterTextChange={this.handleFilterTextChange}
                />
                <DraftBoard
                    players={this.props.players}
                    filterText={this.state.filterText}
                    filterBy={this.state.filterBy}
                />
            </div>
        );
    }
}

function DraftBoard(props) {
    
    const rows = props.players.filter(player => {
        return player[props.filterBy].toLowerCase().includes(props.filterText.toLowerCase());
    })
        .map((player, idx) => {
            return <PlayerRow key={idx} playerData={player} />
        });

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>School</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
};

function PlayerRow (props) {
    const { name, position, school } = props.playerData;

    return (
        <tr>
            <td>{name}</td>
            <td>{position}</td>
            <td>{school}</td>
        </tr>
    );
};

function SearchBar(props) {
    return (
        <form>
            <input type="text" placeholder="Search..." value={props.filterText} onChange={props.handleFilterTextChange} />
            <select name="filterBy" value={props.filterBy} onChange={props.handleFilterByChange}>
                <option value="name">Name</option>
                <option value="position">Position</option>
                <option value="school">School</option>
            </select>
        </form>
    );
};