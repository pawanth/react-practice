import { useDelPost } from "./helper";

export default function Delete(props){
    useDelPost(props.match.params.id)
    return <h1>Delete View</h1>
}