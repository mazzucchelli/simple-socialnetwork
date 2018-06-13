import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const currentUserId = 2;
let postsLength;

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
                userId: currentUserId,
                id: postsLength + 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(result => {
            postsLength += 1;
            console.log('postsLength var', postsLength);
            this.props.onAdd(result.title, result.body, result.userId, result.id);
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
    onAdd: PropTypes.func.isRequired,
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            posts: [],
            users: []
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(
                (result) => {
                    postsLength = result.length;
                    this.setState({
                        isLoaded: true,
                        posts: result.reverse().slice(0, 5)
                    });
                }, (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(res => res.json())
            .then((result) => {
                this.setState({ users: result })
            })
        }

    onPostAdd(postTitle, postBody, userId, postId) {
        this.state.posts.push({
            body: postBody,
            id: postId,
            title: postTitle,
            userId: userId
        });
        this.setState(this.state);
    }

    render() {
        const { error, isLoaded, posts, users } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <section className="grid page-container">
                    <aside className="cell m3 users-status">
                        <ul className="box-layout">
                            <li className="online">
                                Matteo Mazzucchelli
                            </li>
                            {users.map(user => (
                                <li key={user.id}>
                                    {user.name}
                                </li>
                            ))}
                        </ul>
                    </aside>
                    <main className="cell m9">
                        <section className="submit-post-wrap box-layout bg--c-primary">
                            <AddPost onAdd={this.onPostAdd.bind(this)} />
                        </section>
                        <section className="posts-wrap">
                            {posts.reverse().map(post => (
                                <article key={post.id} className="article box-layout">
                                    <div className="author">
                                        <div className="avatar-wrap">
                                            <img src="media/placeholder-profile.jpg" alt="Mario Rossi" />
                                        </div>
                                        <span className="author-name">
                                            {users.filter(user => user.id === post.userId).map(user => user.name)}
                                        </span>
                                    </div>
                                    <h1 className="h4 title">{post.title}</h1>
                                    <p>{post.body}</p>
                                </article>
                            ))}
                        </section>
                    </main>
                </section>
            );
        }
    }
}

export default App;
