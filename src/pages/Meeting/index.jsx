import { Peer } from "peerjs";

export default function () {
    const userId = localStorage.getItem("userId")
    const peer = new Peer(userId);


    return (
        <div> hello</div>
    )
}