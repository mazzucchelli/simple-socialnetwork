import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from '../config.js';

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
        this.updatePost = this.updatePost.bind(this);
    }

    componentDidMount() {

    }

    getNormalView() {
        return (
            <article className="article box-layout">
                <div className="post-wrap">
                    <div className="author">
                        <div className="avatar-wrap">
                            <img src="https://www.epay.com/en/templates/Epay.en/assets/images/avatar.jpg" alt={this.props.author} />
                        </div>
                        <span className="author-name">
                            {this.props.author}
                        </span>
                    </div>
                    <h1 className="h4 title">{this.props.postTitle}</h1>
                    <p>{this.props.postBody}</p>
                    {this.extraActions()}
                </div>
                <Comments postId={this.props.postId} />
            </article>
        );
    }

    getEditView() {
        return (
            <article className="article box-layout">
                <div className="post-wrap">
                    <div className="author">
                        <div className="avatar-wrap">
                            <img src="https://www.epay.com/en/templates/Epay.en/assets/images/avatar.jpg" alt={this.props.author} />
                        </div>
                        <span className="author-name">
                            {this.props.author}
                        </span>
                    </div>
                    <input type="text" placeholder="Dai un titolo al tuo post" onChange={this.onTitleChange.bind(this)} value={this.state.titleToEdit}/>
                    <textarea autoFocus rows="4" placeholder="Scrivi un post.." onChange={this.onBodyChange.bind(this)} value={this.state.bodyToEdit}></textarea>
                    {this.extraActions('edit')}
                </div>
                <Comments postId={this.props.postId} />
            </article>
        );
    }

    extraActions(view = 'normal') {
        if ( this.props.authorId === config.currentUserId ) {
            if ( view === 'edit') {
                return (
                    <div className="btn-wrap">
                        <button className="btn rounded" onClick={() => {this.deletePost(this.props.postId)}}><i className="fas fa-trash-alt"></i></button>
                        <button className="btn rounded" onClick={() => {this.editPost(this.props.postId)}}><i className="fas fa-undo-alt"></i></button>
                        <button className="btn rounded" onClick={() => {this.updatePost(this.props.postId)}}><i className="fas fa-arrow-right"></i></button>
                    </div>
                )
            } else {
                return (
                    <div className="btn-wrap">
                        <button className="btn rounded" onClick={() => {this.deletePost(this.props.postId)}}><i className="fas fa-trash-alt"></i></button>
                        <button className="btn rounded" onClick={() => {this.editPost(this.props.postId)}}><i className="fas fa-pencil-alt"></i></button>
                    </div>
                )
            }
        } else {
            return '';
        }
    }

    setView() {
        if (!this.state.isEditing) {
            return this.getNormalView();
        } else {
            return this.getEditView();
        }
    }

    onTitleChange(e) {
        this.setState({ titleToEdit: e.target.value })
    }

    onBodyChange(e) {
        this.setState({ bodyToEdit: e.target.value })
    }

    updatePost(postId) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                title: this.state.titleToEdit,
                body: this.state.bodyToEdit
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(result => {
            console.log('result', result);
            this.setState({ isEditing: !this.state.isEditing });
        }, (error) => {
            console.log('error', error);
        })
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

Article.propTypes = {
    postId: PropTypes.number.isRequired,
    postTitle: PropTypes.string,
    postBody: PropTypes.string,
    author: PropTypes.string.isRequired,
    authorId: PropTypes.number.isRequired
}

export default Article;
