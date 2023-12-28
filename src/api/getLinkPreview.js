import config from '@/appconfig.js'

export default async function getLinkPreview(url) {
    var data = { q: url }

    const res = await fetch('https://api.linkpreview.net', {
        method: 'POST',
        headers: {
            'X-Linkpreview-Api-Key': config.linkPreviewKey,
        },
        mode: 'cors',
        body: JSON.stringify(data),
    });
    
    return await res.json();
}