import {useState, useEffect, Fragment} from 'react'
import { Link } from 'react-router-dom'
import Update from './Update'
import {useHistory, matchPath } from "react-router";

const Detail = (props) => {
    const [post, setpost] = useState({'title': '', 'content':''})
    const match = matchPath(props.history.location.pathname, {
        path: '/detail/:id',
        exact: true,
        strict: true
    })
    const request = 'http://127.0.0.1:8000/posts/'+ match.params.id
    useEffect(()=> {
        document.title = "Blog|Detail"
        fetch(request)
            .then((response => response.json()))
            .then((data) => setpost(data))
    }, []);
    return (
        <>
            <h1> {post.title} </h1> 
            <div>
                <Link to={'/update/' + post.id} > Update </Link>
                <Link to={'/delete/' + post.id} > Delete </Link>
            </div>
            {/* <h2>{props.match.params.id}</h2> */}
            <img src={post.image} alt={post.title} />
            <br/>
            <p>{post.content.split('\n').map((item, key) => <Fragment key={key}>{item}<br/></Fragment>)}</p>
        </>
    );
}

export default Detail;