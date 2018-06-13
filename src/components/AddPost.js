import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from '../config.js';

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postTitle: '',
            postBody: ''
        };
    }

    onSubmit(e) {
        e.preventDefault();
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: this.state.postTitle,
                body: this.state.postBody,
                userId: config.currentUserId,
                id: config.postsLength + 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(result => {
            config.postsLength += 1;
            this.props.onUpdatePosts(result.title, result.body, result.userId, result.id);
            this.setState({
                postTitle: '',
                postBody: ''
            });
        }, (error) => {
            console.log('error', error);
        })
    }

    onTitleChange(e) {
        this.setState({ postTitle: e.target.value })
    }

    onBodyChange(e) {
        this.setState({ postBody: e.target.value })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label className="hide">
                    Post title
                </label>
                <input type="text" placeholder="Dai un titolo al tuo post" onChange={this.onTitleChange.bind(this)} value={this.state.postTitle}/>
                <label className="hide">
                    Post
                </label>
                <textarea placeholder="Scrivi un post.." onChange={this.onBodyChange.bind(this)} value={this.state.postBody}></textarea>
                <button>Submit</button>
            </form>
        )
    }
}

AddPost.propTypes = {
    onUpdatePosts: PropTypes.func.isRequired
}

export default AddPost;
