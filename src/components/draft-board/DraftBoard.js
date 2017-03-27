import React from 'react';
import _ from 'lodash';

import './DraftBoard.scss';

export class DraftBoardContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            filterBy: 'name',
            players: props.players
        }
        this.handleFilterByChange = this.handleFilterByChange.bind(this);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleSort = this.handleSort.bind(this);

        this.headings = {
            name: 'Name',
            position: 'Position',
            forty: 'Speed',
            school: 'School'
        }

        this.sortType = '';
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
           players: nextProps.players 
        });
    }

    handleFilterByChange(e) {
        this.setState({
            filterBy: e.target.value,
            players: this.filterPlayers(this.state.filterText, e.target.value)
        });
    }

    handleFilterTextChange(e) {
        this.setState({
            filterText: e.target.value,
            players: this.filterPlayers(e.target.value, this.state.filterBy)
        });
    }

    filterPlayers(searchText, filterBy) {
        return this.props.players.filter(player => {
            return player[filterBy].toLowerCase().includes(searchText.trim().replace(/\s+/g, ' ').toLowerCase());
        });
    }

    handleSort(e) {
        const sortBy = _.find(Object.keys(this.headings), heading => this.headings[heading] === e.target.innerHTML);
      
        this.setState({
            players: this.sortPlayers(sortBy)
        });
    }

    sortPlayers(sortBy) {
        let compareFn;

        if (typeof this.props.players[0][sortBy] === 'number') {
            compareFn = (a, b) => {
                return a[sortBy] - b[sortBy];
            };
        } else {
            compareFn = (a, b) => {
                a = a[sortBy].toLowerCase();
                b = b[sortBy].toLowerCase();

                if (a < b) return -1;
                else if (a > b) return 1;
                else return 0;
            };
        }

        return this.state.players.sort(compareFn);
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
                <DraftBoard>
                    <DraftBoardHeader handleSort={this.handleSort} headings={this.headings} sort={this.sortType}></DraftBoardHeader>
                    <DraftBoardBody players={this.state.players}></DraftBoardBody>
                </DraftBoard>
            </div>
        );
    }
}

function DraftBoard(props) {
    return (
        <table>
            {props.children}
        </table>
    );
}

function DraftBoardHeader({headings, handleSort, sort}) {

    const getClassString = heading => sort.prop === heading ? sort.type : '';

    return (
        <thead onClick={handleSort}>
            <tr>
                <th className={getClassString('name')}>{headings.name}</th>
                <th className={getClassString('position')}>{headings.position}</th>
                <th className={getClassString('school')}>{headings.school}</th>
                <th className={getClassString('forty')}>{headings.forty}</th>
            </tr>
        </thead>
    )
}

function DraftBoardBody({players}) {
    return (
        <tbody>
            {players.map((player, idx) => <PlayerRow key={idx} name={player.name} position={player.position} school={player.school} forty={player.forty}></PlayerRow>)}
        </tbody>
    );
}

function PlayerRow({name, position, school, forty}) {
    return (
        <tr>
            <td>{name}</td>
            <td>{position}</td>
            <td>{school}</td>
            <td>{forty}</td>
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