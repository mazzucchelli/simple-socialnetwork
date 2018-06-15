import React, { Component } from 'react';
import config from '../config.js';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            users: []
        };
    }

    componentDidMount() {
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    users: result
                })
            })
    }

    render() {
        const { error, isLoaded, users } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <ul className="box-layout"></ul>
            )
        } else {
            return (
                <ul className="box-layout">
                    {users.map(user => (
                        <li key={user.id} className={( user.id === config.currentUserId ) ? 'online' : ''}>
                            <p>{user.name}</p>
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

export default Sidebar;
