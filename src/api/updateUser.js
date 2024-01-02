import myFetch from "./myFetch"

export default async (idUser, firstName, lastName, gender, phone, email, birthday) => {
    console.log("updateUser:", gender, phone, email, birthday)
    const formData = new FormData();
    formData.append('FirstName', firstName);
    formData.append('LastName', lastName);
    formData.append('Gender', gender);
    formData.append('Phone', phone);
    formData.append('Email', email);
    formData.append('BirthDay', birthday);
    const res = await myFetch({
        path: `User/${idUser}`,
        method: "PUT",
        body: formData
    })
};
