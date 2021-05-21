import {useGraphDelPost } from "../helper/helper";
import React from 'react'

export default function Delete(props){
    useGraphDelPost(props.match.params.id)
    return <h1>Delete View</h1>
}