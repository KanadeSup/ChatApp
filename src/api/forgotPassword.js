import baseUrl from "./baseUrl";
import apikey from "./apiKey";

export default async (email, newPassword, otp) => {
    try {
        const response = await fetch(baseUrl("Auth/forgot-password"), {
            method: "POST",
            headers: {
                "x-apikey": apikey,
                "content-type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "newPassword": newPassword,
                "otp": otp
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
