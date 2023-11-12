import baseUrl from "./baseUrl";
import apikey from "./apiKey";

export default async (email, username, password) => {
    try {
        const response = await fetch(baseUrl("Auth/signup"), {
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
                "Phone": "6",
                "Gender": true,
                "BirthDay": "2023-11-09T09:04:28.587Z"
            })
        });
        return response.json();
    } catch (error) {
        return error;
    }
};
