import baseUrl from "./baseUrl";
import apikey from "./apiKey";

export default async (token, otp) => {
    try {
        const response = await fetch(baseUrl("verify-register"), {
            method: "POST",
            headers: {
                "x-apikey": apikey,
                "content-type": "application/json",
                "accept": "application/json",
                "authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "Otp": otp
            })
        });
        console.log(response);
        if (response.status === 200) {
            console.log('Phản hồi từ máy chủ là 200 nhưng không có nội dung.');
            return;
        } else {
            console.log('Phản hồi từ máy chủ là 400 nhưng không có nội dung.');
            return response.json();
        }

    } catch (error) {
        return error;
    }
};
