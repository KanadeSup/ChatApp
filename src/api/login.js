import baseUrl from "./baseUrl";
import apikey from "./apiKey";

export default async (username, password) => {
    try {
        const response = await fetch(baseUrl("signin"), {
            method: "POST",
            headers: {
                "x-apikey": apikey,
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });
        return await response.json();
    } catch (error) {
        return error;
    }
};
