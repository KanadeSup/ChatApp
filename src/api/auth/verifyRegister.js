import appconfig from "../../appconfig";
import myFetch from "../myFetch";
const apikey = appconfig.apiKey

export default async (token, otp) => {
    try {
        const response = await myFetch({
            path: "Auth/verify-register",
            method: "POST",
            headers: {
                "x-apikey": apikey,
                "content-type": "application/json",
                "accept": "application/json",
                "authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "otp": otp
            })
        });
        console.log(response);
        if (response.status === 200) {
            console.log('Phản hồi từ máy chủ là 200 nhưng không có nội dung.');
            return;
        } else {
            console.log('Phản hồi từ máy chủ là 400.');
            return response.json();
        }

    } catch (error) {
        return error;
    }
};
