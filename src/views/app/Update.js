import React, { useRef, useEffect } from "react";
import {useHistory } from "react-router";
import {useGraphPost, graphql_url} from '../helper/helper'

function Update(props){
    const form = useRef(this)
    let post = useGraphPost(props.match.params.id)
    let history = useHistory();
    useEffect(()=> {
        document.title = "Blog|Update"
    }, []);

    const submit = (e) => {
        e.preventDefault()
        const formData = new FormData(form.current);
        let myData = {}
        for (var key of formData.entries()){
            // console.log(key[0] + ': ' + key[1])
            myData[key[0]] = key[1]
        }
        let query = `
            mutation {
                mutatePost(input:{
                    id: "${post.id}",
                    title:"${myData.title}",
                    content:"${myData.content}",
                }) {
                    post {
                        title
                        id
                        content
                    }
                }
            }
        `;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({query})
        };
        fetch(graphql_url, requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            history.push('/detail/' + data.data.mutatePost.post.id)
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
            <p>
                <label htmlFor="id_content">Content:</label> 
                <textarea name="content" cols="40" rows="10" required id="id_content" defaultValue={post.content}></textarea>
            </p>
            <p>
                <label htmlFor="id_image">Image:</label> 
                <input type="file" name="image" 
                    accept="image/*" id="id_image" />
            </p>
            <input type="submit" value="Submit" />
        </form>
    </>);
}

export default Update