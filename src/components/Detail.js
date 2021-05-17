import {useState, useEffect, Fragment} from 'react'
const Detail = (props) => {
    const [post, setpost] = useState({'title': 'test', 'image':'fuck', 'content':'choot\nfatti'})
    const request = 'http://127.0.0.1:8000/api/posts/'+ props.match.params.id
    console.log('props: ' + props.match.params.id)
    useEffect(()=> {
        document.title = "Blog|Detail"
        fetch(request)
            .then((response => response.json()))
            .then((data) => setpost(data))
    }, []);
    return (
        <>
            <h1> {post.title} </h1> 
            <div>Update - Delete</div>
            {/* <h2>{props.match.params.id}</h2> */}
            <img src={post.image} alt={post.title} />
            <br/>
            <p>{post.content.split('\n').map((item, key) => <Fragment key={key}>{item}<br/></Fragment>)}</p>
        </>
    );
}

export default Detail;