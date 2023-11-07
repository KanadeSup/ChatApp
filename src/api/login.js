import axios from "axios";
import baseUrl from "./baseUrl";
import apikey from "./apiKey";
export default async (username, password) => {
    return await axios({
        method: "post",
        url: baseUrl("signin"),
        data: {
            "username": username,
            "password": password
        },
        headers: {
            "x-apikey": apikey,
            "content-type": "application/json",
            "accept": "application/json"
        }
    }).then(response => {
        return response.data;
    }).catch(error => {
        return error;
    }
    );
};
