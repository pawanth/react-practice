import { useEffect, useRef, useState } from "react";
import {useHistory, matchPath } from "react-router";

export default function Delete(props){
    let history = useHistory();
    const match = matchPath(props.history.location.pathname, {
        path: '/delete/:id',
        exact: true,
        strict: true
    })
    const request = 'http://127.0.0.1:8000/posts/'+ match.params.id
    useEffect(()=>{
        const requestOpetion = {
            method: 'DELETE'
        }
        fetch(request, requestOpetion)
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
    return <h1>Delete View</h1>
}