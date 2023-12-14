import myFetch from "../myFetch"
export default async (uid, avatar) => {
    console.log(avatar)
    const formData = new FormData()
    formData.append("Picture", avatar, "image")
    console.log(formData)
    console.log(uid)
    const res = await myFetch({
        path: `User/${uid}/picture`,
        method: "PUT",
        headers: {
            "accept": "text/plain"
        },
        body: formData
    })
};
