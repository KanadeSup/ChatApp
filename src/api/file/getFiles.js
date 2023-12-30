import myFetch from "../myFetch";

export default async function getFiles(id, offset, limit, isChannel) {
    console.log("getFiles", id, offset, limit, isChannel);
    const path ="file"
    let params = isChannel ? `ToChannelId=${id}` : `ToUserId=${id}`;
    params += `&offset=${offset}&limit=${limit}`;
    const res = await myFetch({
        path: path,
        params: params,
    });
    const data = await res.json();
    return data;
}

