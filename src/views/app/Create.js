import React, { useRef } from "react";
import {useHistory } from "react-router";
import {graphql_url} from '../helper/helper'

function Create(props){
    const form = useRef(this)
    let history = useHistory();

    function handleFileUpload(e){
        const picturePreview = URL.createObjectURL(e.target.files[0])
        console.log(picturePreview)
    }

    const submit = (e) => {
        e.preventDefault()
        const formData = new FormData(form.current);
        let myData = {}
        for (var key of formData.entries()){
            console.log(key[0] + ': ' + key[1])
            myData[key[0]] = key[1]
        }
        console.log("title: " + myData.title)
        let query = `
            mutation {
                mutatePost(input:{
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

        // const requestOptions = {
        //     method: 'POST',
        //     body: formData
        // };
        // fetch('http://localhost:8000/posts/', requestOptions)
        // .then(async response => {
        //     const isJson = response.headers.get('content-type')?.includes('application/json');
        //     const data = isJson && await response.json();
        //     // check for error response
        //     if (!response.ok) {
        //         // get error message from body or default to response status
        //         const error = (data && data.message) || response.status;
        //         return Promise.reject(error);
        //     }
        //     history.push('/detail/' + data.id)
        // })
        // .catch(error => {
        //     console.error('There was an error!', error);
        // });
    };
    return (
    <>
        <h1>Create/Update Blog Post</h1>
        <form ref={form} onSubmit={submit} encType="mutlipart/form-data">
            <p>
                <label htmlFor="id_title">Title:</label> 
                <input type="text" name="title" maxLength="120" required id="id_title" defaultValue={''} />
            </p>
            {/* {post.error.name && <p>{post.error.name}</p>} */}
            <p>
                <label htmlFor="id_content">Content:</label> 
                <textarea name="content" cols="40" rows="10" required id="id_content" defaultValue={''}></textarea>
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

export default Create