import {useEffect, Fragment} from 'react'
import { Link } from 'react-router-dom'
import {matchPath } from "react-router";
import {useGraphPost, usePost} from './helper'

const Detail = (props) => {
    const match = matchPath(props.history.location.pathname, {
        path: '/detail/:id',
        exact: true,
        strict: true
    })
    const post = useGraphPost(match.params.id)
    useEffect(()=> {document.title = "Blog|Detail"}, []);
    return (
        <>
            <h1> {post.title} </h1> 
            <div>
                <Link to={'/update/' + post.id} > Update </Link>
                <Link to={'/delete/' + post.id} > Delete </Link>
            </div>
            {/* <h2>{props.match.params.id}</h2> */}
            <img src={"http://localhost:8000/media/"+post.image} alt={post.title} />
            <br/>
            <p>{post.content.split('\n').map((item, key) => <Fragment key={key}>{item}<br/></Fragment>)}</p>
        </>
    );
}

export default Detail;