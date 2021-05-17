import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Detail from './Detail'

function Home(props){
    const [posts, setposts] = useState([])
    useEffect(()=> {
        document.title = "Blog|Home"
        fetch('http://127.0.0.1:8000/api/posts/')
            .then((response => response.json()))
            .then((data) => {
                    setposts(data)
                    // console.log(data)
                }
            )
    }, []);
    let listItems = posts.map((post, index) => 
        <li key={index}><Link to={'/' + post.id}>{post.title}</Link></li>
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