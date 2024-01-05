import appconfig from "../../appconfig";
import myFetch from "../myFetch";
const apikey = appconfig.apiKey

export default async (otpType, email) => {
    try {
        const response = await myFetch({
            path: "Auth/get-otp",
            method: "POST",
            headers: {
                "x-apikey": apikey,
                "content-type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify({
                "otpType": otpType,
                "email": email
            })
        });
        console.log(response);
        if (response.status === 200) {
            return {
                data: null,
                status: response.status,
                ok: true
            }
        }
        const data = await response.json();
        return {
            data: data,
            status: response.status,
            ok: false
        }

    } catch (error) {
        return error;
    }
};
