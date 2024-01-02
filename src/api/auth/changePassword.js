import myFetch from "../myFetch";

export default async function changePassowrd (currentPassword, newPassword, otp) {
    const res = await myFetch({
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        path: `auth/change-password`,
        method: "POST",
        body: JSON.stringify({currentPassword, newPassword, otp})
    })
    if (res.status === 200) {
        return {
            data: null,
            status: res.status,
            ok: true
        }
    }
    const data = await res.json();
    return {
        data: data,
        status: res.status,
        ok: false
    }
}