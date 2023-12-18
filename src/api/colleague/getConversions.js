import myFetch from "../myFetch"
export default async function (search, offset, limit) {
    const param = search ? `Search=${search}&offset=${offset}&limit=${limit}` : `offset=${offset}&limit=${limit}`
    const res = await myFetch({
        path: `Messages/conversations`,
        params: param,
        headers: {
            "accept": "text/plain",
        },
    })
    const status = res.status
    const data = await res.json()
    return data
}
