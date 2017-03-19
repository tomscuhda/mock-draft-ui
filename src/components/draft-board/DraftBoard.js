import React from 'react';

import './DraftBoard.scss';

export class FilterableDraftBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            filterBy: 'name',
        }
        this.handleFilterByChange = this.handleFilterByChange.bind(this);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterByChange(filter) {
        console.log(filter);
        this.setState({
            filterBy: filter
        });
    }

    handleFilterTextChange(text) {
        console.log(text);
        this.setState({
            filterText: text
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

class DraftBoard extends React.Component {

    render() {

        const rows = this.props.players.filter(player => {
            return player[this.props.filterBy].toLowerCase().indexOf(this.props.filterText.toLowerCase()) !== -1;
        })
        .map((player, idx) => {
            return <PlayerRow key={idx} playerData={player}/>
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
    }
}

class PlayerRow extends React.Component {
    render() {

        const { name, position, school } = this.props.playerData;

        return (
            <tr>
                <td>{name}</td>
                <td>{position}</td>
                <td>{school}</td>
            </tr>
        );
    }
}

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleFilterByChange = this.handleFilterByChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.handleFilterTextChange(e.target.value);
    }

    handleFilterByChange(e) {
        this.props.handleFilterByChange(e.target.value);
    }

    render() {
        return (
            <form>
                <input type="text" placeholder="Search..." value={this.props.filterText} onChange={this.handleFilterTextChange}/>
                <select name="filterBy" value={this.props.filterBy} onChange={this.handleFilterByChange}>
                    <option value="name">Name</option>
                    <option value="position">Position</option>
                    <option value="school">School</option>
                </select>
            </form>
        );
    }
}