import { useEffect, useRef, useState } from "react";
import { useHistory, matchPath } from "react-router";

export function usePost(postId){
    const [post, setPost] = useState({'title':'', 'content':''})
    useEffect(() => {
        const request = 'http://127.0.0.1:8000/posts/' + postId
        fetch(request)
            .then(response => response.json())
            .then(data => setPost(data))
    }, []);
    return post
}

export const usePosts = () => {
    const [posts, setPosts] = useState([])
    useEffect(()=> {
        document.title = "Blog|Home"
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer my-token',
                // 'My-Custom-Header': 'foobar'
            },
        };
        fetch('http://127.0.0.1:8000/posts/', requestOptions)
            .then((response => response.json()))
            .then((data) => {
                    setPosts(data.results)
                    // console.log(data.results)
                }
            )
    }, []);
    return posts
}

export const useGraphPost = (postId) => {
    const [post, setPost] = useState({'title':'', 'content':''})
    const query = `
        query {
            post(id: "${postId}"){
                title
                content
                image
            }
        }
    `;
    useEffect(()=> {
        document.title = "Blog|Home"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({query})
        };
        fetch('http://127.0.0.1:8000/graphql/', requestOptions)
            .then(response => response.json())
            .then((data) => setPost(data.data.post))
    }, []);
    return post
}

export const useGraphPosts = () => {
    const [posts, setPosts] = useState([])
    const query = `
        query {
            allPosts {
                edges {
                    node {
                        id
                        title
                    }
                }
            }
        }
    `;
    useEffect(()=> {
        document.title = "Blog|Home"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({query})
        };
        fetch('http://127.0.0.1:8000/graphql/', requestOptions)
            .then(response => response.json())
            .then((data) => setPosts(data.data.allPosts.edges))
    }, []);
    return posts.map(post => post.node)
}

export const useDelPost = (postId) => {
    let history = useHistory();
    useEffect(()=>{
        const request = 'http://127.0.0.1:8000/posts/'+ postId
        fetch(request, {method: 'DELETE'})
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            history.push('/')
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }, []);
}
