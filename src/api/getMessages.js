export default async function getMessages() {
    const apiKey = "5J0jCR1dAkvDt3YVoahpux0eawahkQB9";
    const baseUrl = "https://api.firar.live/api";
    const path = `Messages?TimeCursor=2023-12-06T23%3A38%3A24.798Z&Count=5&ToUserId=97f75d63-e7f1-4205-adf4-08dbe02fb464?`; // Bỏ dấu ? hết lỗi
    const token = localStorage.getItem('token');
 
    const headers = {
       "x-apikey": apiKey,
       "Authorization": `Bearer ${token}`,
       "accept": "text/plain",
    };
 
    const res = await fetch(`${baseUrl}/${path}`, { method: "GET", headers: headers });
 
    if(res.status === 401) {
       console.log("401");
    }
 
    const data = await res.json();
    console.log("djfjfdjdfjfd", data);
    return data;
 };
 