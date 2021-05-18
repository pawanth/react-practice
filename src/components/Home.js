import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import {useGraphPosts, usePosts} from './helper'

function Home(props){
    const posts = usePosts()
    const data = useGraphPosts()
    
    let listItems = posts.map((post, index) => 
        <li key={index}><Link to={'/detail/' + post.id}>{post.title}</Link></li>
    );
    return (
        <>
            <h1>Following posts so far</h1>
            <ol>{listItems}</ol>
            <Link to="/create" className="btn btn-primary btn-block">Create new post</Link>
        </>
    );
}
const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
export default Home;