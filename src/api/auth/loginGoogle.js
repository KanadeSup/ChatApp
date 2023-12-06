import baseUrl from "../baseUrl";
import apikey from "../apiKey";

export default async (code) => {
  const response = await fetch(baseUrl("Auth/signin-google?code=") + code, {
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
