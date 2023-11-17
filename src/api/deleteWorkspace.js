import baseUrl from "./baseUrl";
import apiKey from "./apiKey";
import myFetch from "./myFetch"

export default async (id) => {
   const formData = new FormData()
   const res = await myFetch({
      path:`Workspace/${id}`,
      method: "DELETE"
   })
};
