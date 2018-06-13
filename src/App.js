import React, { Component } from 'react';
import config from './config.js';

import Comments from './components/Comments.js';
import AddPost from './components/AddPost.js';
import Sidebar from './components/Sidebar.js';

import './App.css';
import './assets/avatar.jpg';

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
                    config.postsLength = result.length;
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
        this.state.posts.unshift({
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
                        <Sidebar />
                    </aside>
                    <main className="cell m9">
                        <section className="submit-post-wrap box-layout bg--c-primary">
                            <AddPost onUpdatePosts={this.onPostAdd.bind(this)} />
                        </section>
                        <section className="posts-wrap">
                            {posts.map(post => (
                                <article key={post.id} className="article box-layout">
                                    <div className="author">
                                        <div className="avatar-wrap">
                                            <img src="https://www.epay.com/en/templates/Epay.en/assets/images/avatar.jpg" alt="Mario Rossi" />
                                        </div>
                                        <span className="author-name">
                                            {users.filter(user => user.id === post.userId).map(user => user.name)}
                                        </span>
                                    </div>
                                    <h1 className="h4 title">{post.title}</h1>
                                    <p>{post.body}</p>
                                    <Comments postId={post.id}/>
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
