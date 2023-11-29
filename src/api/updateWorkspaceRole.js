import myFetch from "./myFetch"

export default async (wid, rid, roledata) => {
   const res = await myFetch({
      path: `Workspace/${wid}/roles/${rid}`,
      method: "PUT",
      headers: {
         'Content-Type': 'application/json',
         "workspace-id": wid,
      },
      body: JSON.stringify(roledata)
   })
};
