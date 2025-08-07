
async function  sendLoginRequest(body: any): Promise<any> {
    console.log("API: ", import.meta.env.VITE_API_BASE_URL)
    const apiUrl = import.meta.env.VITE_API_BASE_URL + '/login';
    const response  = await fetch(
        apiUrl,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }
    );

    if(!response.ok) {
        throw Error('Failed to send request');
    }
    const data: any = await response.json();
    return data;
}

export default sendLoginRequest;