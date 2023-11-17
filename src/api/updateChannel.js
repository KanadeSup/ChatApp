import myFetch from "./myFetch"
export default async (cid, name, description) => {
   const res = await myFetch({
      path: `Channel/${cid}`,
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         "name": name.trim(),
         "description": description.trim()
      })
   })
};
