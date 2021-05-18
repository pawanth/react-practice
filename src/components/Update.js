import { useRef, useState, useEffect } from "react";
import {useHistory, matchPath } from "react-router";

function Update(props){
    const [post, setPost] = useState({title:'', content:''})
    const form = useRef(this)
    const match = matchPath(props.history.location.pathname, {
            path: '/update/:id',
            exact: true,
            strict: false
        })
    const request = 'http://127.0.0.1:8000/posts/'+ match.params.id
    let history = useHistory();
    useEffect(()=> {
        document.title = "Blog|Update"
        fetch(request)
            .then((response => response.json()))
            .then((data) => setPost(data))
    }, []);

    function handleFileUpload(e){
        const picturePreview = URL.createObjectURL(e.target.files[0])
        console.log(picturePreview)
    }

    const submit = (e) => {
        e.preventDefault()
        // const formData = new FormData()
        // formData.append("title", title);
        const formData = new FormData(form.current);
        // for (var key of formData.entries()){
        //     console.log(key[0] + ': ' + key[1])
        // }
        const requestOptions = {
            method: 'POST',
            // NOTE: Remove headers to avoid BadRequeest error from DRF
            // headers: { 
            //     // 'Content-Type': 'application/json',
            //     'Accept': 'application/json',
            //     'Content-Type': 'multipart/form-data',
            // },
            body: formData
            // body: JSON.stringify({ 'title': title, 'content': content })
        };
        fetch('http://localhost:8000/posts/', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            history.push('/detail/' + data.id)
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };
    return (
    <>
        <h1>Create/Update Blog Post</h1>
        <form ref={form} onSubmit={submit} encType="mutlipart/form-data">
            <p>
                <label htmlFor="id_title">Title:</label> 
                <input type="text" name="title" maxLength="120" required id="id_title" defaultValue={post.title} />
            </p>
            {/* {post.error.name && <p>{post.error.name}</p>} */}
            <p>
                <label htmlFor="id_content">Content:</label> 
                <textarea name="content" cols="40" rows="10" required id="id_content" defaultValue={post.content}></textarea>
            </p>
            {/* {post.error.content && <p>{post.error.content}</p>} */}
            <p>
                <label htmlFor="id_image">Image:</label> 
                <input type="file" name="image" 
                    onChange={handleFileUpload} accept="image/*" id="id_image" />
            </p>
            <input type="submit" value="Submit" />
        </form>
    </>);
}

export default Update