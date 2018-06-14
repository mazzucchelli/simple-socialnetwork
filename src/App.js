import React, { Component } from 'react';
import config from './config.js';

import Sidebar from './components/Sidebar.js';
import AddPost from './components/AddPost.js';
import Article from './components/Article.js';

import './scss/App.scss';

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
                        posts: result.reverse()
                        // posts: result.reverse().slice(0, 30)
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

    onPostDelete(postId) {
        this.setState({
            posts: this.state.posts.filter((post) => postId !== post.id)
        })
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
                                <Article
                                    key={post.id}
                                    author={users.filter(user => user.id === post.userId).map(user => user.name).toString()}
                                    authorId={post.userId}
                                    postId={post.id}
                                    postTitle={post.title}
                                    postBody={post.body}
                                    onDelete={this.onPostDelete.bind(this)} />
                            ))}
                        </section>
                    </main>
                </section>
            );
        }
    }
}

export default App;
