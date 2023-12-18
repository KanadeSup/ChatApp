import myFetch from "../myFetch";
import appconfig from "../../appconfig";
const apikey = appconfig.apiKey

export default async (username, password) => {
    try {
        const response = await myFetch({
            path: "Auth/signin",
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