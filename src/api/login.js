import baseUrl from "./baseUrl";
import apikey from "./apiKey";

export default async (username, password) => {
    try {
        console.log(username);
        const response = await fetch(baseUrl("Auth/signin"), {
            
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
        return response.json();
    } catch (error) {
        return error;
    }
};
