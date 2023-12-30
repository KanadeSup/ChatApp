import appconfig from "../../appconfig";
import myFetch from "../myFetch";
const apikey = appconfig.apiKey

export default async (email, username, password) => {
    try {
        const response = await myFetch({
            path: "Auth/signup",
            method: "POST",
            headers: {
                "x-apikey": apikey,
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                "Email": email,
                "Username": username,
                "Password": password,
                "FirstName": "string",
                "LastName": "string",
                "Phone": "0123456789",
                "Gender": true,
                "BirthDay": "2023-11-09T09:04:28.587Z"
            })
        });
        return response.json();
    } catch (error) {
        return error;
    }
};
