import React, {useEffect, Fragment} from 'react'
import { Link } from 'react-router-dom'
import {useGraphPost} from '../helper/helper'

const Detail = (props) => {
    const post = useGraphPost(props.match.params.id)
    useEffect(()=> {document.title = "Blog|Detail"}, []);
    return (
        <>
            <h1> {post.title} </h1> 
            <div>
                <Link to={'/update/' + post.id} > Update </Link>
                <Link to={'/delete/' + post.id} > Delete </Link>
            </div>
            <img src={"http://localhost:8000/media/"+post.image} alt={post.title} />
            <br/>
            <p>{post.content.split('\n').map((item, key) => <Fragment key={key}>{item}<br/></Fragment>)}</p>
        </>
    );
}

export default Detail;