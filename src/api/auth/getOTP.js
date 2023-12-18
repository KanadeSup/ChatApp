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
            console.log('Phản hồi từ máy chủ là 200.');
        } else {
            console.log('Phản hồi từ máy chủ là 400: ');
        }
        return await response.json();

    } catch (error) {
        return error;
    }
};
