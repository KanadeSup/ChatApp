import baseUrl from "../baseUrl";
import apikey from "../apiKey";
import myFetch from "../myFetch";

export default async (token, otp) => {
    const res = await myFetch({
        path: `Auth/verify-register`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "otp": otp
        })
    })
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const response = await res.json()
    return response
};


// export async (token, otp) => {
//     try {
//         const response = await fetch(baseUrl("Auth/verify-register"), {
//             method: "POST",
//             headers: {
//                 "x-apikey": apikey,
//                 "content-type": "application/json",
//                 "accept": "application/json",
//                 "authorization": "Bearer " + token
//             },
//             body: JSON.stringify({
//                 "otp": otp
//             })
//         });
//         console.log(response);
//         if (response.status === 200) {
//             return response.json();
//         } else {
//             console.log('Phản hồi từ máy chủ là 400.');
//             return response.json();
//         }

//     } catch (error) {
//         return error;
//     }
// };
