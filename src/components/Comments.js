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
            if ( comments.length > 0 ) {
                return (
                    <div className="comments-wrap">
                        <ul>
                            {comments.map(comment => (
                                <li key={comment.id}>
                                    <span className="author">{comment.email}</span>
                                    <h6>{comment.name}</h6>
                                    <p>{comment.body}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            } else {
                return '';
            }
        }
    }
}

Comments.propTypes = {
    postId: PropTypes.number.isRequired
}

export default Comments;
