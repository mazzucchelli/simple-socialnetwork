import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            comments: [],
        };
    }

    componentDidMount() {
        fetch(`https://jsonplaceholder.typicode.com/posts/${this.props.postId}/comments`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        comments: result
                    });
                }, (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, comments } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return '';
        } else {
            return (
                <ul>
                    {comments.map(comment => (
                        <li key={comment.id}>
                            {comment.name} - {comment.body} - {comment.email}
                        </li>
                    ))}
                </ul>
            )
        }
    }
}

Comments.propTypes = {
    postId: PropTypes.number.isRequired
}

export default Comments;
