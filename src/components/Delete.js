import { useDelPost, useGraphDelPost } from "./helper";

export default function Delete(props){
    useGraphDelPost(props.match.params.id)
    return <h1>Delete View</h1>
}