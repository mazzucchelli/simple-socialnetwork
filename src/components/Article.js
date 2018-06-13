import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Comments from './Comments.js';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            isEditing: false,
            titleToEdit: this.props.postTitle,
            bodyToEdit: this.props.postBody
        };
        this.deletePost = this.deletePost.bind(this);
        this.editPost = this.editPost.bind(this);
    }

    componentDidMount() {

    }

    onTitleChange(e) {
        this.setState({ titleToEdit: e.target.value })
    }

    onBodyChange(e) {
        this.setState({ bodyToEdit: e.target.value })
    }

    getNormalView() {
        return (
            <article className="article box-layout">
                <div className="author">
                    <div className="avatar-wrap">
                        <img src="https://www.epay.com/en/templates/Epay.en/assets/images/avatar.jpg" alt={this.props.author} />
                    </div>
                    <span className="author-name">
                        Normal view: {this.props.author}
                    </span>
                </div>
                <h1 className="h4 title">{this.props.postTitle}</h1>
                <p>{this.props.postBody}</p>
                <button className="btn" onClick={() => {this.deletePost(this.props.postId)}}>Remove</button>
                <br />
                <button className="btn" onClick={() => {this.editPost(this.props.postId)}}>Edit</button>
                <Comments postId={this.props.postId} />
            </article>
        );
    }

    getEditView() {
        return (
            <article className="article box-layout">
                <div className="author">
                    <div className="avatar-wrap">
                        <img src="https://www.epay.com/en/templates/Epay.en/assets/images/avatar.jpg" alt={this.props.author} />
                    </div>
                    <span className="author-name">
                        Edit view: {this.props.author}
                    </span>
                </div>
                <input type="text" placeholder="Dai un titolo al tuo post" onChange={this.onTitleChange.bind(this)} value={this.state.titleToEdit}/>
                <textarea placeholder="Scrivi un post.." onChange={this.onBodyChange.bind(this)} value={this.state.bodyToEdit}></textarea>
                <button className="btn" onClick={() => {this.deletePost(this.props.postId)}}>Remove</button>
                <br />
                <button className="btn" onClick={() => {this.editPost(this.props.postId)}}>Edit</button>
                <Comments postId={this.props.postId} />
            </article>
        );
    }

    setView() {
        if (!this.state.isEditing) {
            return this.getNormalView();
        } else {
            return this.getEditView();
        }
    }

    deletePost(postId) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'DELETE',
        })
        .then(result => {
            console.log('result', result);
        })
    }

    editPost(postId) {
        this.setState({ isEditing: !this.state.isEditing });
    }

    render() {
        return this.setView();
    }
}

Comments.propTypes = {
    postId: PropTypes.number.isRequired,
    postTitle: PropTypes.string,
    postBody: PropTypes.string,
    author: PropTypes.string
}

export default Article;
