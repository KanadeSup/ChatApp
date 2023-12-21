import myFetch from './myFetch';

export default async function uploadFiles(files) {
    console.log(files);
    const formData = new FormData();
    // files.forEach((file) => {
    //     formData.append('files[]', file);
    // });
    files.forEach(file => {
        formData.append('files', file);
    });
    console.log("form data: ",formData);
    const res = await myFetch( {
        path: 'File',
        method: 'POST',
        body: formData,
    });
    const data = await res.json(); 
    return data
}
