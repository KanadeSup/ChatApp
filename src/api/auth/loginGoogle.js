import appconfig from "../../appconfig";
import myFetch from "../myFetch";
const apikey = appconfig.apiKey

export default async (code) => {
  const response = await myFetch({
    path: "Auth/signin-google",
    params: `code=${code}`,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'x-apikey': apikey
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
