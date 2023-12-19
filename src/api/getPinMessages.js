import myFetch from "./myFetch";

export default async function getPinMessages(conversationId, offset, limit, isChannel) {
    let params = `Offset=${offset}&Limit=${limit}`;
    params += isChannel ? `&ToChannelId=${conversationId}` : `&ToUserId=${conversationId}`;
    const res = await myFetch({
        path: "Messages/pin",
        params: params,
        method: "GET",
    });
    const data = await res.json();
    return data;
}
